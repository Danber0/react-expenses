import React, { useEffect } from "react";
import { FormInstance } from "antd";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCategory } from "@/store/reducer/state";

import { IFormValues } from "@/app/home/types";
import { LabelAndValue } from "@/types";

import { axiosInstance } from "@/utils/axios";

import Form from "@/components/Antd/Form/Form";
import Group from "@/components/Antd/Group";
import Modal from "@/components/Antd/Modal";
import Input from "@/components/Antd/Input/Input";
import Button from "@/components/Antd/Button";
import Select from "@/components/Antd/Select";
import FormItem from "@/components/Antd/Form/FormItem";
import DatePicker from "@/components/Antd/DatePicker";
import InputNumber from "@/components/Antd/Input/InputNumber";

interface PropsExpensesModal {
  setVisibleModal: React.Dispatch<boolean>;
  form: FormInstance<IFormValues>;
  visibleModal: boolean;
  handleAddRow: (values: IFormValues) => void;
  categoryData: Array<LabelAndValue>;
}

const ExpensesModal = ({
  setVisibleModal,
  form,
  visibleModal,
  handleAddRow,
  categoryData,
}: PropsExpensesModal) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(({ state }) => state);

  useEffect(() => {
    dispatch(setCategory(categoryData));
  }, []);

  const handleChange = async (value: LabelAndValue) => {
    const isCreate = !value?.label && value;

    if (isCreate) {
      return await axiosInstance.post("/category", {
        name: value.value,
      });
    }
  };

  return (
    <Modal
      title="Added new row"
      open={visibleModal}
      onCancel={() => {
        setVisibleModal(false);
        form.resetFields();
      }}
      footer={false}
    >
      <Form form={form} layout="vertical" onFinish={handleAddRow}>
        <FormItem label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter name" allowClear value={12334} />
        </FormItem>
        <FormItem label="Category" name="category" rules={[{ required: true }]}>
          <Select
            mode="tags"
            options={category}
            onSelect={handleChange}
            className="w-full"
            placeholder="Choose category"
            optionFilterProp="label"
            labelInValue={true}
            allowClear
          />
        </FormItem>
        <Group>
          <FormItem
            className="w-full"
            label="Date"
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" allowClear />
          </FormItem>
          <FormItem
            className="w-full"
            label="Summary"
            name="summary"
            rules={[{ required: true }]}
          >
            <InputNumber className="w-full" placeholder="Enter amount" />
          </FormItem>
        </Group>
        <Group>
          <Button className="w-full" type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            className="w-full"
            type="text"
            onClick={() => setVisibleModal(false)}
          >
            Cancel
          </Button>
        </Group>
      </Form>
    </Modal>
  );
};

export default ExpensesModal;

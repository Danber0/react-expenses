"use client";
import React, { useEffect } from "react";
import { FormInstance, message } from "antd";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCategory } from "@/store/reducer/state";

import { IFormValues } from "@/app/home/types";
import { LabelAndValue } from "@/types";

import { axiosInstance } from "@/utils/axios";
import { formatNumber } from "@/utils/func";

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
  handleEditRow: (values: IFormValues) => void;
  defaultValues: IFormValues | null;
}

const ExpensesModal = ({
  setVisibleModal,
  form,
  visibleModal,
  handleAddRow,
  handleEditRow,
  defaultValues,
}: PropsExpensesModal) => {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(({ state }) => state);

  useEffect(() => {
    if (visibleModal) {
      const getNewCategory = async () => {
        try {
          const { data } = await axiosInstance.get("/category");
          dispatch(setCategory(data));
        } catch (e) {
          message.error("Error while adding category");
        }
      };

      void getNewCategory();
    }
  }, [visibleModal]);

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = async (value: LabelAndValue) => {
    const isCreate = !value?.label && value;

    if (isCreate) {
      try {
        await axiosInstance.post("/category", {
          label: value.value,
        });
      } catch (e) {
        message.error("Error while adding category");
      }
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
      <Form
        form={form}
        layout="vertical"
        onFinish={defaultValues?.name ? handleEditRow : handleAddRow}
      >
        <FormItem label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Enter name" allowClear />
        </FormItem>
        <FormItem label="Category" name="category" rules={[{ required: true }]}>
          <Select
            mode="multiple"
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
            label="Summary in RUB"
            name="summary"
            rules={[{ required: true }]}
          >
            <InputNumber
              formatter={(value) => formatNumber(Number(value))}
              className="w-full"
              placeholder="Enter amount in RUB"
            />
          </FormItem>
        </Group>
        <Group>
          <Button className="w-full" type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            className="w-full"
            type="text"
            onClick={() => {
              setVisibleModal(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
        </Group>
      </Form>
    </Modal>
  );
};

export default ExpensesModal;

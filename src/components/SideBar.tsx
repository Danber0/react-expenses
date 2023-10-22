"use client";

import React, { useEffect } from "react";
import { message } from "antd";

import { LabelAndValue } from "@/types";

import { axiosInstance } from "@/utils/axios";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { setCategory, setExpenses } from "@/store/reducer/state";

import Form from "@/components/Antd/Form/Form";
import Group from "@/components/Antd/Group";
import Select from "@/components/Antd/Select";
import Button from "@/components/Antd/Button";
import FormItem from "@/components/Antd/Form/FormItem";
import FormProvider from "@/components/Antd/Form/FormProvider";

interface IFormValues {
  category: string[];
  start_date: string;
  end_date: string;
}

interface SideBarProps {
  categoryData: Array<LabelAndValue>;
}

const SideBar = ({ categoryData }: SideBarProps) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<IFormValues>();

  const { category } = useAppSelector(({ state }) => state);

  useEffect(() => {
    dispatch(setCategory(categoryData));
  }, [categoryData.length]);

  const handleSubmit = async (formData: IFormValues) => {
    try {
      const { data } = await axiosInstance.get(
        `/expenses?category.value=${formData.category}`,
      );

      dispatch(setExpenses(data));
    } catch (e) {
      message.error("Error while fetching expenses");
    }
  };

  const handleClearFilters = async () => {
    try {
      const { data } = await axiosInstance.get("/expenses");

      dispatch(setExpenses(data));
      form.resetFields();
    } catch (e) {
      message.error("Error get expenses");
    }
  };

  return (
    <FormProvider>
      <div className="grid w-[350px] rounded-2xl bg-[--background-color--sidebar] text-[--color-text-primary] p-6 shadow-lg">
        <h3 className="text-[30px] font-bold mb-5">Filters</h3>
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <FormItem label="Category" name="category">
            <Select
              options={category}
              className="w-full"
              placeholder="Choose category"
              allowClear={true}
            />
          </FormItem>
          <Group>
            <Button
              className="w-full"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Apply
            </Button>
            <Button
              className="w-full"
              type="text"
              size="large"
              onClick={handleClearFilters}
            >
              Reset
            </Button>
          </Group>
        </Form>
      </div>
    </FormProvider>
  );
};

export default SideBar;

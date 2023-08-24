"use client";

import React, { useEffect } from "react";

import { LabelAndValue } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCategory } from "@/store/reducer/state";

import Form from "@/components/Antd/Form/Form";
import Group from "@/components/Antd/Group";
import Select from "@/components/Antd/Select";
import Button from "@/components/Antd/Button";
import FormItem from "@/components/Antd/Form/FormItem";
import DatePicker from "@/components/Antd/DatePicker";
import InputNumber from "@/components/Antd/Input/InputNumber";
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
  const { category } = useAppSelector(({ state }) => state);

  useEffect(() => {
    dispatch(setCategory(categoryData));
  }, [categoryData.length]);

  const handleSubmit = (data: IFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider>
      <div className="grid w-[350px] rounded-2xl bg-[--background-color--sidebar] text-[--color-text-primary] p-6 shadow-lg">
        <h3 className="text-[30px] font-bold mb-5">Filters</h3>
        <Form onFinish={handleSubmit} layout="vertical">
          <FormItem label="Category" name="category">
            <Select
              mode="multiple"
              options={category}
              className="w-full"
              placeholder="Choose category"
              allowClear={true}
            />
          </FormItem>
          <Group label="Date">
            <FormItem name="start_date">
              <DatePicker placeholder="Start date" />
            </FormItem>
            <FormItem name="end_date">
              <DatePicker placeholder="End date" />
            </FormItem>
          </Group>
          <Group label="Summary">
            <FormItem name="summary_from">
              <InputNumber placeholder="From summary" />
            </FormItem>
            <FormItem name="summary_to">
              <InputNumber placeholder="To summary" />
            </FormItem>
          </Group>
          <Button
            className="w-full"
            type="primary"
            size="large"
            htmlType="submit"
          >
            Apply
          </Button>
        </Form>
      </div>
    </FormProvider>
  );
};

export default SideBar;

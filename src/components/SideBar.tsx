"use client";

import React from "react";

import Form from "@/components/Antd/Form/Form";
import Input from "@/components/Antd/Input/Input";
import Select from "@/components/Antd/Select";
import Button from "@/components/Antd/Button";
import FormItem from "@/components/Antd/Form/FormItem";
import DatePicker from "@/components/Antd/DatePicker";
import FormProvider from "@/components/Antd/Form/FormProvider";
import Group from "@/components/Antd/Group";

import { LabelAndValue } from "@/types";

interface IFormValues {
  name: string;
  category: string[];
  start_date: string;
  end_date: string;
}

interface SideBarProps {
  categoryData: Array<LabelAndValue>;
}

const SideBar = ({ categoryData }: SideBarProps) => {
  const handleSubmit = (data: IFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider>
      <div className="grid gap-4 w-[350px] rounded-2xl bg-[--background-color--sidebar] text-[--color-text-primary] p-6 shadow-lg">
        <h3 className="text-[30px] font-bold">Filters</h3>
        <Form onFinish={handleSubmit} layout="vertical">
          <FormItem label="Name" name="name">
            <Input placeholder="Enter name" />
          </FormItem>
          <FormItem label="Category" name="category">
            <Select
              mode="multiple"
              options={categoryData}
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

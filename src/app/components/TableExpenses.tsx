import React, { Fragment } from "react";
import { Popconfirm, Tag } from "antd";
import Image from "next/image";

import { useAppSelector } from "@/hooks";

import { ExpensesType } from "@/types";

import Table from "@/components/Antd/Table";

const columns = (handleDeleteRow: (id: string) => void) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (categories: Array<string>) => (
      <Fragment>
        {categories.map((category) => (
          <Tag key={category} color="green">
            {category}
          </Tag>
        ))}
      </Fragment>
    ),
  },
  {
    title: "Summary",
    dataIndex: "summary",
    key: "summary",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    dataIndex: "edit",
    key: "edit",
    render: () => (
      <Image
        className="cursor-pointer"
        alt="edit"
        src="./edit.svg"
        width={25}
        height={25}
      />
    ),
  },
  {
    dataIndex: "remove",
    key: "remove",
    render: (text: string, options: ExpensesType) => (
      <Popconfirm
        className="cursor-pointer"
        title="Delete row"
        icon=""
        description="Are you sure to delete this item?"
        onConfirm={() => handleDeleteRow(options.id)}
      >
        <Image alt="delete" src="./delete.svg" width={25} height={25} />
      </Popconfirm>
    ),
  },
];

interface TableExpensesProps {
  handleDeleteRow: (id: string) => void;
}

const TableExpenses = ({ handleDeleteRow }: TableExpensesProps) => {
  const expenses = useAppSelector(({ state }) => state.expenses);

  return (
    <Table
      className="shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] rounded-2xl mt-6"
      pagination={false}
      dataSource={expenses}
      columns={columns(handleDeleteRow)}
    />
  );
};

export default TableExpenses;

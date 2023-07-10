import React, { Fragment, useEffect } from "react";
import { message, Popconfirm, Tag, Tooltip } from "antd";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setCurrencyPrice,
  setTotalSpend,
  setTotalSpendCurrent,
} from "@/store/reducer/state";
import { ExpensesType } from "@/types";

import { axiosInstance } from "@/utils/axios";
import { formatNumber } from "@/utils/func";

import Table from "@/components/Antd/Table";

const columns = (
  handleDeleteRow: (id: string) => void,
  currencyPrice: number,
  currentCurrency: string,
) => [
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
    render: (summary: number) => (
      <Tooltip title={String(summary)}>
        <span>{`${
          currencyPrice
            ? formatNumber(summary / currencyPrice)
            : formatNumber(summary)
        } ${currencyPrice ? currentCurrency : "RUB"}`}</span>
      </Tooltip>
    ),
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
  search: string;
}

const TableExpenses = ({ handleDeleteRow, search }: TableExpensesProps) => {
  const dispatch = useAppDispatch();

  const { expenses, currentCurrency, currencyPrice, totalSpend } =
    useAppSelector(({ state }) => state);

  useEffect(() => {
    (async () => {
      const summary = expenses.reduce((total, exp) => total + exp.summary, 0);

      try {
        const { data } = await axiosInstance.get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currentCurrency.value?.toLowerCase()}/rub.json`,
        );

        dispatch(setCurrencyPrice(data.rub));
        dispatch(setTotalSpend(summary));
        dispatch(setTotalSpendCurrent(summary / data.rub));
      } catch (error) {
        dispatch(setCurrencyPrice(0));
        dispatch(setTotalSpend(summary));
        if (currentCurrency.value !== "RUB") {
          message.error("Error while changing currency");
        }
      }
    })();
  }, [currentCurrency.value, expenses, dispatch]);

  return (
    <Table
      className="shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] rounded-2xl mt-6"
      pagination={false}
      footer={() => (
        <Tooltip title={totalSpend.initial}>
          {`Total expenses is ${
            totalSpend.current
              ? formatNumber(totalSpend.current)
              : formatNumber(totalSpend.initial)
          } ${currencyPrice ? currentCurrency.value : "RUB"}`}
        </Tooltip>
      )}
      dataSource={expenses.filter((expenses) =>
        expenses.name.toLowerCase().includes(search.toLowerCase()),
      )}
      columns={columns(handleDeleteRow, currencyPrice, currentCurrency.value)}
    />
  );
};

export default TableExpenses;

import React, { Fragment, useEffect } from "react";
import { message, Popconfirm, Tag, Tooltip } from "antd";

import Edit from "public/edit.svg";
import Delete from "public/delete.svg";

import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/hooks";

import {
  setCurrencyPrice,
  setExpenses,
  setTotalSpend,
  setTotalSpendCurrent,
} from "@/store/reducer/state";
import { ExpensesType, LabelAndValue } from "@/types";

import { axiosInstance } from "@/utils/axios";
import { formatNumber } from "@/utils/func";

import Table from "@/components/Antd/Table";

const columns = (
  handleDeleteRow: (id: number) => void,
  handleOpenModal: (id: number) => void,
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
    render: (categories: Array<LabelAndValue>) => (
      <Fragment>
        {categories.map((category) =>
          category ? (
            <Tag key={category.value} color="green">
              {category.label}
            </Tag>
          ) : (
            ""
          ),
        )}
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
    render: (text: string, options: ExpensesType) => (
      <Edit
        className="theme-svg cursor-pointer"
        onClick={() => handleOpenModal(options.id)}
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
        <Delete className="theme-svg" />
      </Popconfirm>
    ),
  },
];

interface TableExpensesProps {
  handleDeleteRow: (id: number) => void;
  handleOpenModal: (id?: number) => void;
  search: string;
}

const TableExpenses = ({
  handleDeleteRow,
  handleOpenModal,
  search,
}: TableExpensesProps) => {
  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce(search, 300);

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

  useEffect(() => {
    const searchExpenses = async () => {
      try {
        const { data } = await axiosInstance.get(
          debouncedValue ? `/expenses?name=*${debouncedValue}*` : `/expenses`,
        );

        dispatch(setExpenses(data));
      } catch (e) {
        message.error("Error while searching");
      }
    };

    void searchExpenses();
  }, [debouncedValue]);

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
      dataSource={expenses}
      columns={columns(
        handleDeleteRow,
        handleOpenModal,
        currencyPrice,
        currentCurrency.value,
      )}
    />
  );
};

export default TableExpenses;

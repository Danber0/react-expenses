"use client";
import React, { useEffect, useState } from "react";

import { IFormValues } from "@/app/home/types";
import { ExpensesType, LabelAndValue } from "@/types";

import { useAppDispatch } from "@/hooks";
import {
  addExpenses,
  removeExpenses,
  setExpenses,
} from "@/store/reducer/state";

import { axiosInstance } from "@/utils";

import Form from "@/components/Antd/Form/Form";
import ExpensesModal from "@/app/home/components/ExpensesModal";
import TopExpensesActions from "@/app/home/components/TopExpensesActions";
import TableExpenses from "@/app/home/components/TableExpenses";

interface MainExpensesContentProps {
  expensesData: Array<ExpensesType>;
  currencyData: Array<LabelAndValue>;
  categoryData: Array<LabelAndValue>;
}

const MainExpensesContent = ({
  expensesData,
  currencyData,
  categoryData,
}: MainExpensesContentProps) => {
  const [form] = Form.useForm<IFormValues>();
  const [search, setSearch] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setExpenses(expensesData));
  }, [dispatch, expensesData]);

  const handleDeleteRow = (id: string) => {
    dispatch(removeExpenses(id));
    return axiosInstance.delete(`/expenses/${id}`);
  };

  const handleAddRow = async (dataForm: IFormValues) => {
    const { data } = await axiosInstance.post("/expenses", {
      ...dataForm,
      category: dataForm.category.map(
        (category) => category.label ?? category.value
      ),
    });

    form.resetFields();

    dispatch(addExpenses(data));
    setVisibleModal(false);
  };

  return (
    <main className="ml-3.5 w-full">
      <ExpensesModal
        setVisibleModal={setVisibleModal}
        handleAddRow={handleAddRow}
        form={form}
        visibleModal={visibleModal}
        categoryData={categoryData}
      />
      <TopExpensesActions
        setVisibleModal={setVisibleModal}
        setSearch={setSearch}
        search={search}
        currencyData={currencyData}
      />
      <TableExpenses search={search} handleDeleteRow={handleDeleteRow} />
    </main>
  );
};

export default MainExpensesContent;
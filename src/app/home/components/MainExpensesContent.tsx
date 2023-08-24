"use client";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";

import { IFormValues } from "@/app/home/types";
import { ExpensesType, LabelAndValue } from "@/types";

import { useAppDispatch } from "@/hooks";
import {
  addExpenses,
  editExpenses,
  removeExpenses,
  setExpenses,
} from "@/store/reducer/state";

import { axiosInstance } from "@/utils/axios";

import Form from "@/components/Antd/Form/Form";
import ExpensesModal from "@/app/home/components/ExpensesModal";
import TopExpensesActions from "@/app/home/components/TopExpensesActions";
import TableExpenses from "@/app/home/components/TableExpenses";

interface MainExpensesContentProps {
  expensesData: Array<ExpensesType>;
  currencyData: Array<LabelAndValue>;
}

const MainExpensesContent = ({
  expensesData,
  currencyData,
}: MainExpensesContentProps) => {
  const [form] = Form.useForm<IFormValues>();
  const [search, setSearch] = useState("");
  const [visibleModal, setVisibleModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState<IFormValues | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setExpenses(expensesData));
  }, [dispatch, expensesData]);

  const handleOpenModal = async (id?: number) => {
    setVisibleModal(true);

    if (!id) {
      setDefaultValues(null);
      return;
    }

    try {
      const { data } = await axiosInstance.get<IFormValues>(`/expenses/${id}`);

      if (!data) {
        return;
      }

      setDefaultValues({
        ...data,
        date: dayjs(data.date),
      });
    } catch (e) {
      alert(e);
    }
  };

  const handleAddRow = async (dataForm: IFormValues) => {
    try {
      const { data } = await axiosInstance.post("/expenses", dataForm);

      dispatch(addExpenses(data));

      form.resetFields();
    } catch (e) {
      void message.error("Error while adding expense");
    } finally {
      setVisibleModal(false);
    }
  };

  const handleDeleteRow = (id: number) => {
    try {
      void axiosInstance.delete(`/expenses/${id}`);
      dispatch(removeExpenses(id));
    } catch (e) {
      void message.error("Error while deleting expense");
    }
  };

  const handleEditRow = async (dataForm: IFormValues) => {
    try {
      const { data } = await axiosInstance.patch<ExpensesType>(
        `/expenses/${defaultValues?.id}`,
        dataForm,
      );
      form.resetFields();

      dispatch(editExpenses(data));
    } catch (e) {
      void message.error("Error while editing expense");
    } finally {
    }

    setVisibleModal(false);
  };

  return (
    <main className="ml-3.5 w-full">
      <ExpensesModal
        setVisibleModal={setVisibleModal}
        handleAddRow={handleAddRow}
        handleEditRow={handleEditRow}
        form={form}
        visibleModal={visibleModal}
        defaultValues={defaultValues}
      />
      <TopExpensesActions
        handleOpenModal={handleOpenModal}
        setSearch={setSearch}
        search={search}
        currencyData={currencyData}
      />
      <TableExpenses
        search={search}
        handleDeleteRow={handleDeleteRow}
        handleOpenModal={handleOpenModal}
      />
    </main>
  );
};

export default MainExpensesContent;

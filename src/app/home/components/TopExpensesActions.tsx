"use client";
import React from "react";

import Search from "public/search.svg";
import Plus from "public/plus.svg";
import Sort from "public/sort.svg";

import { LabelAndValue } from "@/types";

import { setCurrency } from "@/store/reducer/state";
import { useAppDispatch } from "@/hooks";

import Input from "@/components/Antd/Input/Input";
import Popover from "@/components/Antd/Popover";
import Select from "@/components/Antd/Select";
import Button from "@/components/Antd/Button";

interface TopExpensesActionsProps {
  handleOpenModal: (id?: number) => void;
  setSearch: React.Dispatch<string>;
  search: string;
  currencyData: Array<LabelAndValue>;
}

const TopExpensesActions = ({
  handleOpenModal,
  currencyData,
  setSearch,
  search,
}: TopExpensesActionsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between">
      <Input
        className="max-w-[200px] shadow-lg"
        size="large"
        prefix={<Search className="theme-svg" />}
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        placeholder="Search..."
      />
      <div className="flex gap-3">
        <Popover content="sort" trigger="click" placement="bottom">
          <div className="inline-block p-2.5 bg-[--background-color--block] rounded-b-md cursor-pointer shadow-lg">
            <Sort className="theme-svg" />
          </div>
        </Popover>
        <Select
          options={currencyData}
          defaultValue={() => {
            dispatch(setCurrency(currencyData[0]));
            return currencyData[0];
          }}
          onSelect={(value, option) => {
            dispatch(setCurrency(option as LabelAndValue));
          }}
          size="large"
          placeholder="Select currency"
        />
        <Button
          className="shadow-lg"
          size="large"
          onClick={() => handleOpenModal()}
          icon={<Plus className="theme-svg" />}
        >
          Add new row
        </Button>
      </div>
    </div>
  );
};

export default TopExpensesActions;

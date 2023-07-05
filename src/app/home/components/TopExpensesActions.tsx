import React from "react";
import Image from "next/image";

import { LabelAndValue } from "@/types";

import Input from "@/components/Antd/Input/Input";
import Popover from "@/components/Antd/Popover";
import Select from "@/components/Antd/Select";
import Button from "@/components/Antd/Button";
import { useAppDispatch } from "@/hooks";
import { setCurrency } from "@/store/reducer/state";

interface TopExpensesActionsProps {
  setVisibleModal: React.Dispatch<boolean>;
  setSearch: React.Dispatch<string>;
  search: string;
  currencyData: Array<LabelAndValue>;
}

const TopExpensesActions = ({
  setVisibleModal,
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
        prefix={
          <Image alt="search" src="./search.svg" width={20} height={20} />
        }
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        placeholder="Search..."
      />
      <div className="flex gap-3">
        <Popover content="sort" trigger="click" placement="bottom">
          <div className="inline-block p-2.5 bg-[--background-color--block] rounded-b-md cursor-pointer shadow-lg">
            <Image alt="sort" src="./sort.svg" width={20} height={20} />
          </div>
        </Popover>
        <Select
          className="shadow-lg min-w-[100px]"
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
          onClick={() => setVisibleModal(true)}
          icon={<Image alt="plus" src="./plus.svg" width={13} height={13} />}
        >
          Add new row
        </Button>
      </div>
    </div>
  );
};

export default TopExpensesActions;

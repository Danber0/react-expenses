import React from "react";
import Image from "next/image";

import { LabelAndValue } from "@/types";

import Input from "@/components/Antd/Input/Input";
import Popover from "@/components/Antd/Popover";
import Select from "@/components/Antd/Select";
import Button from "@/components/Antd/Button";

interface TopExpensesActionsProps {
  setVisibleModal: React.Dispatch<boolean>;
  currencyData: Array<LabelAndValue>;
}

const TopExpensesActions = ({
  setVisibleModal,
  currencyData,
}: TopExpensesActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <Input
        className="max-w-[200px]"
        size="large"
        prefix={
          <Image alt="search" src="./search.svg" width={20} height={20} />
        }
        placeholder="Search..."
      />
      <div className="flex gap-3">
        <Popover content="sort" trigger="click">
          <div className="inline-block p-2.5 bg-[--background-color--block] rounded-b-md cursor-pointer shadow-lg">
            <Image alt="sort" src="./sort.svg" width={20} height={20} />
          </div>
        </Popover>
        <Select
          className="shadow-lg min-w-[100px]"
          options={currencyData}
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

"use client";

import React from "react";
import { Select as AntSelect, SelectProps } from "antd";

const Select = ({ ...rest }: SelectProps) => {
  return <AntSelect {...rest} />;
};

Select.Option = AntSelect.Option;

export default Select;

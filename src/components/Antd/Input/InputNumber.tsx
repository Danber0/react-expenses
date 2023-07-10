"use client";

import React from "react";
import { InputNumber as AntInputNumber, InputNumberProps } from "antd";

const InputNumber = ({ ...rest }: InputNumberProps) => {
  return <AntInputNumber {...rest} style={{ width: "100%" }} />;
};

export default InputNumber;

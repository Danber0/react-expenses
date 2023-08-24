"use client";

import React from "react";
import { DatePicker as AntDatePicker, DatePickerProps } from "antd";

const DatePicker = ({ ...rest }: DatePickerProps) => {
  return <AntDatePicker {...rest} style={{ width: "100%" }} />;
};

export default DatePicker;

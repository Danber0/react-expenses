"use client";

import React from "react";
import { DatePicker as AntDatePicker, DatePickerProps } from "antd";

const DatePicker = ({ ...rest }: DatePickerProps) => {
  return <AntDatePicker {...rest} />;
};

export default DatePicker;

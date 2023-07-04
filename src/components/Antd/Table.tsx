"use client";

import React from "react";
import { Table as AntTable, TableProps } from "antd";

const Table = ({ ...rest }: TableProps<any>) => {
  return <AntTable {...rest} />;
};

export default Table;

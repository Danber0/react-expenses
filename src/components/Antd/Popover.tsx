"use client";

import React from "react";
import { Popover as AntPopover, PopoverProps } from "antd";

const Popover = ({ children, ...rest }: PopoverProps) => {
  return <AntPopover {...rest}>{children}</AntPopover>;
};

export default Popover;

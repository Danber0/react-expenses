"use client";
import React from "react";
import { Button, ButtonProps } from "antd";

interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonComponent = ({ children, ...rest }: IButtonProps) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonComponent;

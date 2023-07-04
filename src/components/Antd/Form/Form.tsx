"use client";

import React from "react";
import { Form as AntForm, FormProps } from "antd";

interface IFormProps extends FormProps {
  children: React.ReactNode;
}

const Form = ({ children, ...rest }: IFormProps) => {
  return <AntForm {...rest}>{children}</AntForm>;
};

Form.useForm = AntForm.useForm;

export default Form;

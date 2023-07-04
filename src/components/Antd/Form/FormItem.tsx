"use client";
import React from "react";

import { Form, FormItemProps } from "antd";

interface FormProp extends FormItemProps {
  children: React.ReactNode;
}

const FormItem = ({ children, ...rest }: FormProp) => (
  <Form.Item {...rest}>{children}</Form.Item>
);

export default FormItem;

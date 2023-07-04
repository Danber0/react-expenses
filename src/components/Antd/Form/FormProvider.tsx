"use client";

import React from "react";
import { Form } from "antd";
import { FormProviderProps } from "antd/es/form/context";

interface FormProp extends FormProviderProps {
  children: React.ReactNode;
}

const FormProvider = ({ children, ...rest }: FormProp) => (
  <Form.Provider {...rest}>{children}</Form.Provider>
);

export default FormProvider;

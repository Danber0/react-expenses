"use client";
import React from "react";
import { Modal as AntModal, ModalProps } from "antd";

interface IModalProps extends ModalProps {
  children: React.ReactNode;
}

const Modal = ({ children, ...rest }: IModalProps) => {
  return <AntModal {...rest}>{children}</AntModal>;
};

export default Modal;

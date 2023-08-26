"use client";
import React from "react";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { axiosInstance } from "@/utils/axios";

import { setIsAuth } from "@/store/reducer/state";

import Form from "@/components/Antd/Form/Form";
import Input from "@/components/Antd/Input/Input";
import Modal from "@/components/Antd/Modal";
import FormItem from "@/components/Antd/Form/FormItem";
import Button from "@/components/Antd/Button";
import { useAppDispatch } from "@/hooks";

interface SignModalProps {
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<boolean>;
}

interface IFormValues {
  name: string | null;
  email: string;
  password: string;
}

const SignModal = ({ visibleModal, setVisibleModal }: SignModalProps) => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<IFormValues>();
  const [isLogin, setIsLogin] = React.useState(true);

  const onSubmit = async (formData: IFormValues) => {
    if (formData.name) {
      try {
        const { data } = await axiosInstance.post("/register", formData);

        dispatch(setIsAuth(true));
        localStorage.setItem("token", data.token);
        setVisibleModal(false);
      } catch (error) {
        console.log(error);
      }

      return;
    }

    try {
      const { data } = await axiosInstance.post("/auth", formData);

      dispatch(setIsAuth(true));
      localStorage.setItem("token", data.token);
      setVisibleModal(false);
    } catch (error) {
      console.log(error);
    }

    form.resetFields();
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <Modal
          title="Login Modal"
          open={visibleModal}
          centered
          onCancel={() => {
            setVisibleModal(false);
          }}
          footer={false}
        >
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <FormItem
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Enter email" allowClear />
            </FormItem>
            <FormItem
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                type="password"
                placeholder="Enter password"
                allowClear
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </FormItem>
            <div className="flex justify-between items-center">
              <Button type="text" onClick={() => setIsLogin(false)}>
                Registration account
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      ) : (
        <Modal
          title="Register Modal"
          open={visibleModal}
          centered
          onCancel={() => {
            setVisibleModal(false);
            setIsLogin(true);
          }}
          footer={false}
        >
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <FormItem label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Enter name" allowClear />
            </FormItem>
            <FormItem
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Enter email" allowClear />
            </FormItem>
            <FormItem
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password
                type="password"
                placeholder="Enter password"
                allowClear
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </FormItem>
            <div className="flex justify-between items-center">
              <Button type="text" onClick={() => setIsLogin(true)}>
                Login to account
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default SignModal;

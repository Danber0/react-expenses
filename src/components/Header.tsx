"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";

import { axiosInstance } from "@/utils/axios";
import { ABOUT, ANALYTICS, HOME } from "@/utils/conts/urls";
import { setIsAuth, setUserInfo } from "@/store/reducer/state";

import { useAppDispatch, useAppSelector } from "@/hooks";

import Button from "@/components/Antd/Button";
import ThemeSwitch from "@/components/ThemeSwitch";
import SignModal from "@/components/SignModal";
import Popover from "@/components/Antd/Popover";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(({ state }) => state);
  const [visibleModal, setVisibleModal] = React.useState(false);

  useEffect(() => {
    const checkUser = async () => {
      if (!user.isAuth) return;

      try {
        const { data } = await axiosInstance.get("/auth_me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        dispatch(setUserInfo(data));
      } catch (e) {
        dispatch(setIsAuth(false));
      }
    };

    void checkUser();
  }, [user.isAuth]);

  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        const { data } = await axiosInstance.get("/auth_me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        dispatch(setUserInfo(data));
      } catch (e) {
        dispatch(setIsAuth(false));
      }
    };

    void checkIsAuth();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserInfo({ isAuth: false, name: "", email: "" }));
  };

  return (
    <header className="p-[20px] rounded-b-2xl shadow-lg">
      <SignModal
        setVisibleModal={setVisibleModal}
        visibleModal={visibleModal}
      />
      <nav className="flex justify-between items-center">
        <ul className="flex justify-center items-center gap-[80px] text-[--color-text-primary] text-2xl font-bold select-none">
          <Link href={HOME} className="cursor-pointer">
            Main
          </Link>
          <Link href={ANALYTICS} className="cursor-pointer">
            Analytics
          </Link>
          <Link href={ABOUT} className="cursor-pointer">
            About Site
          </Link>
        </ul>
        <div className="flex items-center gap-[20px]">
          <ThemeSwitch />
          <React.Fragment>
            {user.name ? (
              <Popover
                content={
                  <div className="flex flex-col text-[17px]">
                    <span className="text-[--color-text-primary]">
                      {user.name}
                    </span>
                    <div className="w-full h-0.5 bg-gray-50 my-[8px]" />
                    <Button type="text" onClick={onLogout}>
                      Log Out
                    </Button>
                  </div>
                }
                trigger="click"
                placement="bottomRight"
                className="text-2xl text-[--color-text-primary] cursor-pointer"
              >
                <UserOutlined />
              </Popover>
            ) : (
              <Button size="large" onClick={() => setVisibleModal(true)}>
                Log In
              </Button>
            )}
          </React.Fragment>
        </div>
      </nav>
    </header>
  );
};

export default Header;

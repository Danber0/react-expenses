"use client";
import React from "react";
import Link from "next/link";

import { useAppDispatch } from "@/hooks";

import { setTheme } from "@/store/reducer/state";

import { ABOUT, ANALYTICS, HOME } from "@/utils/conts/urls";

import Button from "@/components/Antd/Button";

const Header = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      dispatch(setTheme("theme-dark"));
    } else {
      dispatch(setTheme("theme-light"));
    }
  }, []);

  const onChangeTheme = () => {
    if (document.documentElement.className === "theme-dark") {
      dispatch(setTheme("theme-light"));
    } else {
      dispatch(setTheme("theme-dark"));
    }
  };

  return (
    <header className="p-[20px] rounded-b-2xl shadow-lg">
      <nav className="flex justify-between items-center">
        <ul className="flex justify-center items-center gap-[80px] text-[--color-text-primary] text-2xl font-bold select-none">
          <Link href={HOME} className="cursor-pointer" onClick={onChangeTheme}>
            Main
          </Link>
          <Link href={ANALYTICS} className="cursor-pointer">
            Analytics
          </Link>
          <Link href={ABOUT} className="cursor-pointer">
            About Site
          </Link>
        </ul>
        <Button size="large">Log In</Button>
      </nav>
    </header>
  );
};

export default Header;

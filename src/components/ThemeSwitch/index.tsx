"use client";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { setTheme } from "@/store/reducer/state";

import "./index.css";

const ThemeSwitch = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(({ state }) => state.theme);

  useEffect(() => {
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
    <input
      onChange={onChangeTheme}
      checked={currentTheme === "theme-light"}
      type="checkbox"
      name="checkbox"
      className="switch"
    />
  );
};

export default ThemeSwitch;

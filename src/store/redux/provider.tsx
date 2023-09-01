"use client";

import React, { useState } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

import { store } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState("theme-light");
  const { darkAlgorithm, defaultAlgorithm } = theme;

  store.subscribe(() => {
    setCurrentTheme(store.getState().state.theme);
  });

  return (
    <Provider store={store}>
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <ConfigProvider
        theme={{
          algorithm:
            currentTheme === "theme-dark" ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: currentTheme === "theme-dark" ? "#2d2d2d" : "#1677ff",
          },
        }}
      >
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </ConfigProvider>
    </Provider>
  );
}

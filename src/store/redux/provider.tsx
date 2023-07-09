"use client";

import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

import { store } from "@/store";

export function Providers({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = React.useState("theme-light");
  const { darkAlgorithm, defaultAlgorithm } = theme;

  store.subscribe(() => {
    setCurrentTheme(store.getState().state.theme);
  });

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm:
            currentTheme === "theme-dark" ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <StyleProvider hashPriority="high">{children}</StyleProvider>
      </ConfigProvider>
    </Provider>
  );
}

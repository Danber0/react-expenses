"use client";

import React, { Suspense, useState } from "react";
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
    <Suspense fallback="Loading...">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm:
              currentTheme === "theme-dark" ? darkAlgorithm : defaultAlgorithm,
            token: {
              colorPrimary:
                currentTheme === "theme-dark" ? "#2d2d2d" : "#1677ff",
            },
          }}
        >
          <StyleProvider hashPriority="high">{children}</StyleProvider>
        </ConfigProvider>
      </Provider>
    </Suspense>
  );
}

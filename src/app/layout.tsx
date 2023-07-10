import React from "react";
import { Nunito } from "next/font/google";

import { Providers } from "@/store/redux/provider";

import Header from "@/components/Header";

import "./globals.css";

const nunito = Nunito({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="theme-light">
      <body className={nunito.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

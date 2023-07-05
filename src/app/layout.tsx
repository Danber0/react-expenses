import React from "react";
import { Nunito } from "next/font/google";

import Header from "@/components/Header";

import { Providers } from "@/store/redux/provider";

import "./globals.css";

const nunito = Nunito({ subsets: ["cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

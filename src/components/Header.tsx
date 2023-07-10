import React from "react";
import Link from "next/link";

import { ABOUT, ANALYTICS, HOME } from "@/utils/conts/urls";

import Button from "@/components/Antd/Button";
import ThemeSwitch from "@/components/ThemeSwitch";

const Header = () => {
  return (
    <header className="p-[20px] rounded-b-2xl shadow-lg">
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
          <Button size="large">Log In</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

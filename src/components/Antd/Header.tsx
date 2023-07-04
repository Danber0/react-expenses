import React from "react";

import Button from "@/components/Antd/Button";

const Header = () => {
  return (
    <header className="p-[20px] rounded-b-2xl shadow-lg">
      <nav className="flex justify-between items-center">
        <ul className="flex justify-center items-center gap-[80px] text-[--color-text-primary] text-2xl font-bold select-none">
          <li className="cursor-pointer">Main</li>
          <li className="cursor-pointer">Analytics</li>
          <li className="cursor-pointer">About Site</li>
        </ul>
        <Button size="large">Log In</Button>
      </nav>
    </header>
  );
};

export default Header;

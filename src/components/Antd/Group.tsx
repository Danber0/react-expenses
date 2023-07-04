import React from "react";

interface ILabel {
  label?: string;
  children: React.ReactNode;
}

const Group = ({ label, children }: ILabel) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <div className="flex gap-2">{children}</div>
    </div>
  );
};

export default Group;

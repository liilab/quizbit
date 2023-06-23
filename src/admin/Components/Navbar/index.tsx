import React from "react";
import Menu from "./Menu";
import { NavbarProps } from "./types";

export default function Navbar({ menus, border_color }: NavbarProps) {
  const color =
    border_color === "purple" ? "border-primary-900" : "border-blue-500";

  return (
    <div
      className={`mb-6 flex items-center gap-5 border-b-2 border-solid ${color}`}
    >
      <h1>QuizBit</h1>
      <Menu menus={menus} />
    </div>
  );
}

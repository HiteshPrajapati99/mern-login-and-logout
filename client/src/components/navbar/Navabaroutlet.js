import React from "react";
import { Outlet } from "react-router-dom";
import Heder from "./Heder";

export default function Navabaroutlet() {
  return (
    <>
      <Heder />
      <Outlet />
    </>
  );
}

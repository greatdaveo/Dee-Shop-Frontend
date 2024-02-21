import React from "react";
import { Outlet } from "react-router-dom/dist/umd/react-router-dom.development";

const SharedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default SharedLayout;

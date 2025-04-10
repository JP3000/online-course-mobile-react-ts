import React from "react";
import TabBottom from "../../components/tab-bottom";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/user";
import "./index.scss";

export default function Main() {
  const { pathname } = useLocation();
  const { userInfo } = useUserStore((state) => state);
  const guard = () => {
    if (userInfo || pathname.indexOf("mine") === -1) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <div className="main">
      {guard()}
      <div className="tab-bottom">
        <TabBottom />
      </div>
    </div>
  );
}

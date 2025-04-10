import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/user";

export interface IGuardProps {
  children: React.ReactNode;
}

export default function Guard(props: IGuardProps) {
  const { pathname } = useLocation();
  const { userInfo } = useUserStore((state) => state);

  const guard = () => {
    // 如果用户信息存在，或者路径中包含"mine"，则渲染子组件
    if (userInfo || pathname.indexOf("mine") == -1) {
      return props.children;
    } else {
      // 否则重定向到登录页面
      return <Navigate to={`/login?target=${pathname}`} />;
    }
  };
  return <>{guard()}</>;
}

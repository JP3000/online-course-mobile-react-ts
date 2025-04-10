import { NavBar } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface ICustomNavProps {
  title: string;
}

export default function CustomNav(props: ICustomNavProps) {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  return <NavBar onBack={back}>{props.title}</NavBar>;
}

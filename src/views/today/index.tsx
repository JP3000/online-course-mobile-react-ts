// import React from "react";

import { Avatar, SearchBar } from "antd-mobile";
import TodaySwiper from "./components/today-swiper";
import "./index.scss";
import TodayGrid from "./components/today-grid";
import Course from "../../components/course";
import { useUserStore } from "../../store/user";

// type Props = {}; {}: Props

export default function Today() {
  const { userInfo } = useUserStore((state) => state);
  return (
    <div className="today-cont">
      <div className="header">Have a NiceDay!</div>
      <div className="user">
        <div>
          <h1>{userInfo ? userInfo.username : "加入NiceDay"}</h1>
          <p>注册或登录账号</p>
        </div>
        <Avatar src={userInfo!.avatar} />
      </div>
      <div className="search-cont">
        <SearchBar placeholder="点swiper体验播放器、点列表文字访问详情"></SearchBar>
      </div>
      <TodaySwiper />
      <TodayGrid />
      <Course condition={{}} />
    </div>
  );
}

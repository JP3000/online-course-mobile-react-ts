import React from "react";
import { useNavigate } from "react-router-dom";
import likes from "../../assets/img/ic_likes.png";
import history from "../../assets/img/ic_history.png";
import theme from "../../assets/img/ic_theme.png";
import setting from "../../assets/img/ic_setting.png";
import { Button, Image, List } from "antd-mobile";
import "./index.scss";
import { useUserStore } from "../../store/user";
import ImgUpload from "../../components/img-upload";

// type Props = {}; {}: Props

export default function Mine() {
  const navigate = useNavigate();
  const { userInfo, logout } = useUserStore((state) => state);

  // likes, history, theme, setting,
  const listArr = [
    { title: "我的喜欢", icon: likes },
    { title: "历史记录", icon: history },
    { title: "主题", icon: theme },
    { title: "设置", icon: setting },
  ];

  return (
    <div className="mine">
      <div className="user">
        {/* <Avatar className="avatar" src={userInfo!.avatar} /> */}
        <ImgUpload />
        <div>
          <h1>{userInfo ? userInfo.username : "加入NiceDay"}</h1>
          <p>点击头像切换图片</p>
        </div>
      </div>

      <div className="list-cont">
        <List>
          {listArr.map((item, index) => {
            return (
              <List.Item
                prefix={
                  <Image
                    src={item.icon}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => {
                  navigate("/mine/collect");
                }}
                key={index}
              >
                {item.title}
              </List.Item>
            );
          })}
        </List>
      </div>

      <div className="list-cont">
        <List>
          {listArr.map((item, index) => {
            return (
              <List.Item
                prefix={
                  <Image
                    src={item.icon}
                    style={{ borderRadius: 20 }}
                    fit="cover"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => {}}
                key={index}
              >
                {item.title}
              </List.Item>
            );
          })}
        </List>
      </div>

      <Button
        className="logout"
        block
        color="danger"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        退回登录
      </Button>
    </div>
  );
}

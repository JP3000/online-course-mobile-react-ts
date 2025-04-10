import { TabBar } from "antd-mobile";
import {
  MessageOutline,
  MessageFill,
  UserOutline,
  AppOutline,
} from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TabBottom() {
  const tabs = [
    {
      key: "/today",
      title: "今日",
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: "99+",
    },
    {
      key: "/explore",
      title: "探索",
      icon: <AppOutline />,
    },
    {
      key: "/mine",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState<string>(tabs[0].key);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log(location);

  useEffect(() => {
    setActiveKey(pathname);
  }, [pathname]);

  const handleTab = (key: string) => {
    navigate(key);
    setActiveKey(key);
  };

  return (
    <TabBar onChange={handleTab} activeKey={activeKey}>
      {tabs.map((item) => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
          className="tab-bar"
        />
      ))}
    </TabBar>
  );
}

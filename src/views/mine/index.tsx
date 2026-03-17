import { useNavigate } from "react-router-dom";
import likes from "../../assets/img/ic_likes.png";
import history from "../../assets/img/ic_history.png";
import theme from "../../assets/img/ic_theme.png";
import setting from "../../assets/img/ic_setting.png";
import { RightOutline } from "antd-mobile-icons";
import { Button, Image, List, Toast } from "antd-mobile";
import "./index.scss";
import { useUserStore } from "../../store/user";
import ImgUpload from "../../components/img-upload";

interface MenuItem {
  title: string;
  subtitle: string;
  icon: string;
  path?: string;
}

const menuGroups: { groupTitle: string; items: MenuItem[] }[] = [
  {
    groupTitle: "学习中心",
    items: [
      {
        title: "我的喜欢",
        subtitle: "查看你标记过的内容",
        icon: likes,
        path: "/mine/collect",
      },
      {
        title: "历史记录",
        subtitle: "回看最近学习轨迹",
        icon: history,
        path: "/mine/collect",
      },
    ],
  },
  {
    groupTitle: "个性偏好",
    items: [
      {
        title: "主题",
        subtitle: "切换应用主题风格",
        icon: theme,
      },
      {
        title: "设置",
        subtitle: "账号与通知管理",
        icon: setting,
      },
    ],
  },
];

export default function Mine() {
  const navigate = useNavigate();
  const { userInfo, logout } = useUserStore((state) => state);

  const profileTags = userInfo
    ? ["账号状态: 已登录", "头像支持自定义", "同步学习偏好"]
    : ["账号状态: 游客", "登录后解锁收藏", "支持自定义头像"];

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
      return;
    }

    Toast.show({
      content: `${item.title} 功能建设中`,
      position: "bottom",
    });
  };

  return (
    <div className="mine-page">
      <section className="mine-hero">
        <div className="mine-hero__content">
          <div className="mine-profile">
            <div className="mine-profile__avatar">
              <ImgUpload />
            </div>
            <div className="mine-profile__text">
              <h1>{userInfo ? userInfo.username : "加入 NiceDay"}</h1>
              <p>
                {userInfo ? "点击头像可更换个人图片" : "登录后可同步你的学习偏好"}
              </p>
            </div>
          </div>

          <div className="mine-tags">
            {profileTags.map((tag) => {
              return <span key={tag}>{tag}</span>;
            })}
          </div>
        </div>
      </section>

      {menuGroups.map((group) => {
        return (
          <section className="mine-section" key={group.groupTitle}>
            <h2 className="mine-section__title">{group.groupTitle}</h2>

            <List className="mine-list">
              {group.items.map((item) => {
                return (
                  <List.Item
                    key={item.title}
                    className="mine-item"
                    prefix={
                      <span className="mine-item__icon-wrap">
                        <Image
                          src={item.icon}
                          fit="cover"
                          width={20}
                          height={20}
                        />
                      </span>
                    }
                    description={item.subtitle}
                    extra={<RightOutline className="mine-item__arrow" />}
                    onClick={() => {
                      handleMenuClick(item);
                    }}
                  >
                    {item.title}
                  </List.Item>
                );
              })}
            </List>
          </section>
        );
      })}

      <Button
        className="mine-logout"
        block
        fill="outline"
        color="danger"
        onClick={() => {
          logout();
          navigate("/", { replace: true });
        }}
      >
        退回登录
      </Button>
    </div>
  );
}

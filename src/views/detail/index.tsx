import { NavBar } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseDetailGet } from "../../api/course";
import "./index.scss";
import { CourseType } from "../../type/course";
import { useUserStore } from "../../store/user";
import { userCollect, userCollectDel, userCollectGet } from "../../api/user";

export default function Detail() {
  const [collect, setCollect] = useState<boolean>(false); //控制收藏状态
  const [detail, setDetail] = useState<CourseType>();
  const [collectId, setCollectId] = useState(""); // 记录收藏的id
  const { userInfo } = useUserStore((state) => state);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    // 课程详情
    courseDetailGet(params.id as string).then((res) => {
      // console.log("课程详情的调回数据", res);
      setDetail(res.data);
    });

    // 收藏状态
    userCollectGet({
      userId: userInfo?.objectId,
      courseId: params.id as string,
    }).then((res) => {
      // console.log("get collect", res);
      // 如果有数据，则说明已经收藏
      if (res.data.results.length) {
        setCollect(true);
        setCollectId(res.data.results[0].objectId);
      }
    });
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCollect = () => {
    //判断用户的登录状态，只有登录了才能拿到userId进行处理
    if (!userInfo) {
      navigate("/login");
    } else {
      const userId = userInfo.objectId;
      const courseId = detail?.objectId;
      const { name, poster, isVip, intro } = detail as CourseType;
      userCollect({ userId, courseId, name, poster, isVip, intro }).then(
        (res) => {
          setCollect(!collect);
          setCollectId(res.data.objectId);
        }
      );
    }
  };

  const handleDel = () => {
    userCollectDel(collectId);
    setCollect(!collect);
  };

  const right = (
    <>
      {/* 收藏功能 */}
      {collect ? (
        <img className="iconfont jushoucanggift" onClick={handleDel}></img>
      ) : (
        <img className="iconfont jushoucang" onClick={handleCollect}></img>
      )}
    </>
  );
  return (
    <div className="detail-cont">
      <NavBar onBack={handleBack} right={right}>
        课程详情
      </NavBar>
      <div className="detail">
        <>
          <img src={detail?.poster} alt="" />
          <h2>{detail?.name}</h2>
          <p>{detail?.intro}</p>
          {/* 将html样式渲染出来 */}
          <div
            dangerouslySetInnerHTML={{ __html: detail?.detail as string }}
          ></div>
        </>
      </div>
    </div>
  );
}

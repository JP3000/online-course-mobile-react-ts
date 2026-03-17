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
    const id = params.id as string;

    courseDetailGet(params.id as string).then((res) => {
      setDetail(res.data);
    });

    if (!userInfo?.objectId) {
      setCollect(false);
      setCollectId("");
      return;
    }

    userCollectGet({
      userId: userInfo.objectId,
      courseId: id,
    }).then((res) => {
      if (res.data.results.length) {
        setCollect(true);
        setCollectId(res.data.results[0].objectId);
      } else {
        setCollect(false);
        setCollectId("");
      }
    });
  }, [params.id, userInfo?.objectId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCollect = () => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    if (!detail) {
      return;
    }

    const userId = userInfo.objectId;
    const courseId = detail.objectId;
    const { name, poster, isVip, intro } = detail;
    userCollect({ userId, courseId, name, poster, isVip, intro }).then((res) => {
      setCollect(true);
      setCollectId(res.data.objectId);
    });
  };

  const handleDel = () => {
    if (!collectId) {
      return;
    }

    userCollectDel(collectId).then(() => {
      setCollect(false);
      setCollectId("");
    });
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

import { useEffect, useState } from "react";
import CustomNav from "../../components/custom-nav";
import CourseList from "../../components/course/course-list";
import { userCollectGet } from "../../api/user";
import { useUserStore } from "../../store/user";
import { CourseType } from "../../type/course";

export default function Collect() {
  // 通过userId拿到收藏列表
  const { userInfo } = useUserStore((state) => state);
  const [list, setList] = useState<CourseType[]>([]);

  useEffect(() => {
    if (!userInfo?.objectId) {
      setList([]);
      return;
    }

    userCollectGet({ userId: userInfo.objectId }).then((res) => {
      setList(res.data.results);
    });
  }, [userInfo?.objectId]);

  return (
    <div>
      <CustomNav title="个人收藏" />
      <CourseList list={list} idKey="courseId" />
    </div>
  );
}

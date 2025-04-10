import React, { useEffect, useState } from "react";
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
    userCollectGet({ userId: userInfo?.objectId }).then((res) => {
      // console.log(res.data.results);
      setList(res.data.results);
    });
  }, []);

  return (
    <div>
      <CustomNav title="个人收藏" />
      <CourseList list={list} idKey="courseId" />
    </div>
  );
}

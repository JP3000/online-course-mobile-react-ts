// 课程列表封装
import React, { useEffect, useState } from "react";
import { InfiniteScroll } from "antd-mobile";
import "./index.scss";
import { courseGet, ICourseParams } from "../../api/course";
import { CourseType } from "../../type/course";
import CourseList from "./course-list";

type Props = {
  condition: ICourseParams;
};

let page = 1;

export default function Course({ condition }: Props) {
  const [list, setList] = useState<Array<CourseType>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  //首屏数据加载
  useEffect(() => {
    setHasMore(true);
    page = 1;
    courseGet(condition, page).then((res) => {
      // console.log('课程组件',page);
      setList(res.data.results);
      page++;
    });
  }, [condition]);

  //触底逻辑
  const loadMore = async () => {
    courseGet(condition, page).then((res) => {
      const { results } = res.data;
      if (results.length) {
        setList([...list, ...results]);
        page++;
      }
      setHasMore(results.length >= 8);
    });
  };

  return (
    <div>
      <CourseList list={list} idKey="objectId" />
      {list.length ? (
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={100} />
      ) : (
        ""
      )}
    </div>
  );
}

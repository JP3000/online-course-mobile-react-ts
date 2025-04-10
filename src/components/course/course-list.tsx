import { Ellipsis, Tag } from "antd-mobile";
import { Link } from "react-router-dom";
import { CourseType } from "../../type/course";
import CourseSkeleton from "./course-skeleton";

interface CourseListType extends CourseType {
  courseId?: string;
}

export interface ICourseListProps {
  list: CourseListType[];
  idKey: "objectId" | "courseId";
}

export default function CourseList(props: ICourseListProps) {
  const courseList = (
    <div className="course-list">
      {props.list.map((item) => {
        return (
          <div className="course" key={item.objectId}>
            <div className="poster">
              <img src={item.poster} alt="" />
              <Tag className="tag" color="rgba(0,0,0,0.4)">
                {item.isVip ? "会员专享" : "免费"}
              </Tag>
            </div>

            <div>
              <Link to={`/detail/${item[props.idKey]}`}>
                <Ellipsis className="tit" direction="end" content={item.name} />
                <Ellipsis
                  className="info"
                  direction="end"
                  rows={2}
                  content={item.intro}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );

  return <>{props.list.length ? courseList : <CourseSkeleton />}</>;
}

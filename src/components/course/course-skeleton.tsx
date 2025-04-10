import { Skeleton } from "antd-mobile";
import "./skeleton.scss";

export default function CourseSkeleton() {
  return (
    <div className="course-list">
      {[1, 2, 3, 4].map((item, index) => {
        return (
          <div className="course" key={index}>
            <Skeleton animated className="course-skeleton" />
            <Skeleton.Title animated />
            <Skeleton.Paragraph animated />
          </div>
        );
      })}
    </div>
  );
}

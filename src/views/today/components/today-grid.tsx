import { Grid } from "antd-mobile";
import React from "react";
import {} from "../../../assets/img/ic_today_1.png";

function getImageUrl(idx: number) {
  return new URL(`../../../assets/img/ic_today_${idx + 1}.png`, import.meta.url)
    .href;
}

export default function TodayGrid() {
  const gridData = ["Java编程", "前端课程", "UI设计", "架构师"];
  return (
    <div>
      <Grid columns={4} gap={8}>
        {gridData.map((item, index) => {
          return (
            <Grid.Item className="my-grid-item" key={index}>
              <img src={getImageUrl(index)} alt="" />
              <div>{item}</div>
            </Grid.Item>
          );
        })}
      </Grid>
    </div>
  );
}

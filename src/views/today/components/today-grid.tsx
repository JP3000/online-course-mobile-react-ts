import { Grid } from "antd-mobile";

function getImageUrl(idx: number) {
  return new URL(`../../../assets/img/ic_today_${idx + 1}.png`, import.meta.url)
    .href;
}

export default function TodayGrid() {
  const gridData = ["下班冥想", "流瑜伽", "减脂训练", "室内攀岩"];
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

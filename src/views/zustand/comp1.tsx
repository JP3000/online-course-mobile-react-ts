import React from "react";
import { useCounter } from "../../store/count";
import { useBanner } from "../../store/banner";
export default function CompA() {
  const count = useCounter((state) => state.count);
  const banner = useBanner((state) => state.banner);
  return (
    <div className="box">
      <h1>这是A组件, {count}</h1>
      {banner.map((item) => {
        return (
          <img
            key={item.objectId}
            src={item.img}
            style={{ height: "200px" }}
            alt=""
          />
        );
      })}
    </div>
  );
}

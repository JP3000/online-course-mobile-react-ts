import React from "react";
import { useCounter } from "../../store/count";
import { useBanner } from "../../store/banner";
export default function CompB() {
  const { count, increment } = useCounter((state) => state);
  const { fetchBanner, addBanner } = useBanner((state) => state);
  return (
    <div className="box">
      <h1>这是B组件, {count}</h1>
      <button
        onClick={() => {
          increment(10);
        }}
      >
        {" "}
        +{" "}
      </button>
      <button onClick={fetchBanner}>fetchBanner</button>
      <button
        onClick={() =>
          addBanner({
            name: "newBanner",
            img: "http://lc-JdIMW4Dd.cn-n1.lcfile.com/XAQOYTkuh3KhBS3pfnRgIhoTm2dJz1pL/code26.png",
          })
        }
      >
        addBanner
      </button>
    </div>
  );
}

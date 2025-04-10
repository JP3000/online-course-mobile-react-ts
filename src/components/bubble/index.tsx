// components/bubble/index.tsx
import React from "react";
import { FloatingBubble } from "antd-mobile";
import { CloseOutline } from "antd-mobile-icons";
import "./index.scss";
import { usePlayerStore } from "../../store/player";

export default function Bubble() {
  const { isPlay, togglePlay, toggleBubbleShow, popData } = usePlayerStore(
    (state) => state
  );
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50vh 32px 0",
      }}
    >
      <FloatingBubble
        style={{
          "--initial-position-bottom": "24px",
          "--initial-position-right": "24px",
          "--edge-distance": "24px",
        }}
      >
        <div className={`bubble-cont ${isPlay ? "play" : ""}`}>
          <i
            className="fa-solid fa-pause"
            onClick={() => togglePlay(false)}
          ></i>
          <i className="fa-solid fa-play" onClick={() => togglePlay(true)}></i>
          <img src={popData?.img} />
        </div>
        <CloseOutline
          fontSize={25}
          onClick={() => {
            toggleBubbleShow(false);
            togglePlay(false);
          }}
        />
      </FloatingBubble>
    </div>
  );
}

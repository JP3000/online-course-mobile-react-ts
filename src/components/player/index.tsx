import React, { TouchEventHandler, useEffect, useRef, useState } from "react";
import { Popup, Tag } from "antd-mobile";
import { DownOutline } from "antd-mobile-icons";
import "./index.scss";
import { usePlayerStore } from "../../store/player";

let duration = 0;
let barWidth = 0;
let beginWidth = 0;
let beginX = 0;

const timeHandler = (second: number) => {
  const m = Math.floor(second / 60);
  const s = Math.round(second % 60);
  const mStr = m < 10 ? `0${m}` : m;
  const sStr = s < 10 ? `0${s}` : s;
  return `${mStr}:${sStr}`;
};

export default function AudioPlay() {
  const { popShow, toggleShow, popData, togglePlay, isPlay, toggleBubbleShow } =
    usePlayerStore((state) => state);
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [move, setMove] = useState<number>(0);
  const [timeNow, setTimeNow] = useState<string>("00:00");
  const [timeTotal, setTimeTotal] = useState<string>("00:00");

  // 统一控制音频播放/暂停
  useEffect(() => {
    // console.log(duration, barWidth);

    const audio = audioRef.current;
    if (!audio) return;
    if (isPlay) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlay]);

  const handleCanPlay = () => {
    const audio = audioRef.current as HTMLAudioElement;
    const bar = barRef.current as HTMLDivElement;
    duration = audio?.duration;
    barWidth = bar?.offsetWidth;
    setTimeTotal(timeHandler(duration));
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current as HTMLAudioElement;
    const curTime = audio?.currentTime;
    const m = (curTime / duration) * barWidth; // m is move
    setMove(m);
    setTimeNow(timeHandler(curTime));
  };

  const handleStart: TouchEventHandler<HTMLDivElement> = (e) => {
    beginWidth = move;
    // console.log(e);
    beginX = e.changedTouches[0].clientX;
  };

  const handleMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const audio = audioRef.current as HTMLAudioElement;
    const nowX = e.changedTouches[0].clientX;
    const m = nowX - beginX + beginWidth;
    //防止音乐拉拽超出区域
    if (m <= barWidth) {
      audio.currentTime = (m / barWidth) * duration;
      setMove(m);
    }
  };

  return (
    <Popup
      onMaskClick={() => {}}
      bodyStyle={{ height: "100vh" }}
      visible={popShow}
    >
      <div className="audio-play">
        <div className="drop-cont">
          <DownOutline
            fontSize={30}
            onClick={() => {
              toggleShow(false);
              if (isPlay) {
                toggleBubbleShow(true);
              }
            }}
          />
          <Tag color="primary">耀眼的播放器</Tag>
          <span></span>
        </div>

        {/* 将点击事件统一放在父元素上 */}
        <div
          className={`play-btn ${isPlay ? "playing" : ""}`}
          onClick={() => togglePlay(!isPlay)} // 统一切换状态
        >
          <i className="fa-solid fa-play"></i>
          <i className="fa-solid fa-pause"></i>
        </div>

        <div className="audio-control">
          <audio
            ref={audioRef}
            src={popData?.music}
            onCanPlay={handleCanPlay}
            onTimeUpdate={handleTimeUpdate}
          />

          <div className="control-buttons">
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-share"></i>
          </div>

          <div className="bar" ref={barRef}>
            <div className="inner" style={{ width: `${move}px` }}>
              <div
                className="dot"
                onTouchStart={handleStart}
                onTouchMove={handleMove}
              ></div>
            </div>
            <div className="time-cont">
              <span>{timeNow}</span>
              <span>{timeTotal}</span>
            </div>
          </div>
        </div>

        {/* <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div> */}
      </div>
    </Popup>
  );
}

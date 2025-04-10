import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { useEffect, useState } from "react";
import { bannerGet, IBannerType } from "../../../api/home";
import { usePlayerStore } from "../../../store/player";

export default function TodaySwiper() {
  const [banner, setBanner] = useState<Array<IBannerType>>([]);
  const { toggleShow, changePopData } = usePlayerStore((state) => state);

  useEffect(() => {
    bannerGet().then((res) => {
      setBanner(res.data.results);
    });
  }, []);

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {banner?.map((item) => {
          return (
            <SwiperSlide
              key={item.objectId}
              onClick={() => {
                toggleShow(true);
                changePopData(item);
              }}
            >
              <img src={item.img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

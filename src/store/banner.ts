import { create } from "zustand";
import { bannerGet, IBannerType } from "../api/home";
import { persist } from "zustand/middleware";

interface BannerState {
    banner: Array<IBannerType>;
    fetchBanner: () => Promise<void>;
    addBanner: (bannerObj: IBannerType) => void;
}

export const useBanner = create<BannerState>()(persist(
    (set, get) => ({
        banner:[],
        fetchBanner: async () => {
            const res = await bannerGet();
            set({ banner: res.data.results });
        },
        addBanner:(bannerObj) => {
            const arr = get().banner;
            arr.push(bannerObj);
            set({ banner: [...arr] });
        },
    }),
    {
        name: 'banner-list', // 数据本地存储名称
        // getStorage: () => sessionStorage, // 有需要的话可以修改存储位置
    }
))

// export const useBanner = create<BannerState>((set, get) => ({
//     banner:[],
//     fetchBanner: async () => {
//         const res = await bannerGet();
//         set({ banner: res.data.results });
//     },
//     addBanner:(bannerObj) => {
//         const arr = get().banner;
//         arr.push(bannerObj);
//         set({ banner: [...arr] });
//     },
// }));


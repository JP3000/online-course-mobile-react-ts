import { create } from "zustand";
import { IBannerType } from "../api/home";

interface PlayerStateType {
    popShow: boolean;
    popData:IBannerType | null;
    isPlay:boolean;
    bubbleShow: boolean;
    toggleShow: (arg: boolean) => void;
    changePopData: (arg: IBannerType) => void;
    togglePlay:(arg:boolean)=>void
    toggleBubbleShow: (arg: boolean) => void;
}

export const usePlayerStore = create<PlayerStateType>((set) => ({
    popShow:false, 
    popData:null,
    isPlay:false,
    bubbleShow:false,
    toggleShow(bool) {
        set({popShow:bool})
    },
    changePopData(banner) {
        set({popData:banner})
    },
    togglePlay(bool){
        set({isPlay:bool})
    },
    toggleBubbleShow(bubbleShow) {
        set({bubbleShow:bubbleShow})
    },
}));


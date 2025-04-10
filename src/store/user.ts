import { create } from "zustand";
import { IUserParams, userLogin } from "../api/user";
import { persist } from "zustand/middleware";
import { NavigateFunction } from "react-router-dom";
import { UserInfoType } from "../type/user";


interface IUserState {
    userInfo: UserInfoType | null;
    isLoading: boolean;
    loginFetch: (user:IUserParams, navigate:NavigateFunction, target:string) => void;
    logout: () => void;
    update: (userInfo: UserInfoType) => void;
}


export const useUserStore = create<IUserState>()(persist(
    (set) => ({
        userInfo: null,
        isLoading: false,
        async loginFetch(user, navigate, target) {
            set({isLoading: true})
            const res = await userLogin(user)
            // console.log(res); 
            const navigateToTarget = () => {
                if (target) {
                    navigate(target);
                } else {
                    navigate(-1);
                }
            };
            target ? navigateToTarget() : navigateToTarget();
            set({isLoading: false, userInfo: res.data})
        },
        logout: () => {
            set({userInfo: null})
        },
        update: (userInfo) => {
            set({userInfo})
        }
    }),

    {
        name: 'user-info-moblie', // name of the persisted state
    }
));

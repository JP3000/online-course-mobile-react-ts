import { create } from "zustand";
import { IUserParams, userLogin } from "../api/user";
import { persist } from "zustand/middleware";
import { NavigateFunction } from "react-router-dom";
import { UserInfoType } from "../type/user";
import { Toast } from "antd-mobile";


interface IUserState {
    userInfo: UserInfoType | null;
    isLoading: boolean;
    loginFetch: (user:IUserParams, navigate:NavigateFunction, target?:string) => Promise<void>;
    logout: () => void;
    update: (userInfo: UserInfoType) => void;
}


export const useUserStore = create<IUserState>()(persist(
    (set) => ({
        userInfo: null,
        isLoading: false,
        async loginFetch(user, navigate, target) {
            set({isLoading: true})

            try {
                const res = await userLogin(user)

                // 先写入登录态，再跳转，避免守卫在瞬间把页面重定向回登录页
                set({userInfo: res.data})

                if (target) {
                    navigate(target, { replace: true })
                } else {
                    navigate("/today", { replace: true })
                }
            } catch {
                Toast.show({
                    content: "登录失败，请稍后重试",
                    icon: "fail",
                })
            } finally {
                set({isLoading: false})
            }
        },
        logout: () => {
            set({userInfo: null, isLoading: false})
        },
        update: (userInfo) => {
            set({userInfo})
        }
    }),

    {
        name: 'user-info-moblie', // name of the persisted state
        partialize: (state) => ({
            userInfo: state.userInfo,
        }),
        merge: (persistedState, currentState) => {
            return {
                ...currentState,
                ...(persistedState as Partial<IUserState>),
                isLoading: false,
            };
        },
    }
));

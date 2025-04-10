import { UserInfoType } from "../type/user";
import request from "../utils/request";

export interface IUserParams {
    username: string,
    password: string, 
}



export const userLogin = (user:IUserParams) => {
    return request.post('/login', user)
}

// 新增收藏
export interface ICollectParams {
    objectId?: string;
    userId: string | number;
    courseId?: string;
    name: string;
    poster: string;
    isVip: boolean;
    intro: string;
}


export const userCollect = (params: ICollectParams) => {
    return request.post('classes/ReactCollect', params)
}

// 查询收藏
export interface ISearchCollectParams {
    userId: string | undefined | number;
    courseId?: string;
}

export const userCollectGet = (search: ISearchCollectParams) => {
    return request.get('classes/ReactCollect', {
        params:{
            where: search,
        },
    })
}

// 删除收藏
export const userCollectDel = (collectId: string) => {
    return request.delete(`classes/ReactCollect/${collectId}`)
}

// 更新用户信息
export const userUpdate = (userId: string | number, token:string, params: Partial<UserInfoType>) => {
    // return request.put(`user/${userId}`, params);
    return request({ 
        url: `users/${userId}`,
        method: 'PUT',
        data: params,
        headers:{
            'X-LC-Session': token,
        },
    })
}
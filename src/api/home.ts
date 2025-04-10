import request from "../utils/request";


export interface IBannerType {
    objectId?:string,
    name:string,
    img:string,
    music?:string,
}


export const bannerGet = () => {
    return request.get("/classes/ReactBanner")
}
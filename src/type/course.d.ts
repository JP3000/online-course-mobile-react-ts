export interface CourseType {
    objectId: string;
    isVip:boolean;
    poster: string;
    name: string;
    intro: string;
    detail:string;
    level1: string;
    level2: string;
}

export interface CategoryType {
    objectId: string;
    isShow: boolean;
    parentId: string;
    name: string;
    children?: CategoryType[];
}
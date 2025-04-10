import request from "../utils/request";

export interface ICourseParams {
    level1?: string,
    level2?: string,
}

export const courseGet = (condition: ICourseParams, page: number=1) => {
    return request.get('/classes/ReactCourse', {
        params: {
            where: condition,
            // 每页显示4条数据
            limit:4,
            skip:(page - 1) * 4,
        },
    });
};

// 课程分类
export const categoryGet = () => {
    return request.get('/classes/ReactCategory')
}

// 课程详情
export const courseDetailGet = (id:string) => {
    return request.get(`/classes/ReactCourse/${id}`)
}
import axios from "axios";
import { ID, KEY, BASE } from "../config/index";
import { Toast } from "antd-mobile";
import { MOCK_BANNERS, MOCK_CATEGORIES, MOCK_COURSES, MOCK_USER, MOCK_COLLECTS } from "./mock";

interface IMockError {
  config: any;
  mockData: unknown;
  isMock: boolean;
}

const getWhere = (params: any): Record<string, unknown> => {
  if (!params?.where) return {};
  if (typeof params.where === "string") {
    try {
      return JSON.parse(params.where);
    } catch {
      return {};
    }
  }
  return params.where;
};

const getData = (data: any): Record<string, any> => {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }
  return data;
};

const toPositiveNumber = (value: unknown, fallback: number) => {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 ? num : fallback;
};

const pickCollectId = (url: string) => {
  const prefix = "/classes/ReactCollect/";
  if (!url.startsWith(prefix)) return "";
  return url.slice(prefix.length);
};

const resolveMockData = (config: any) => {
  const method = (config.method || "get").toLowerCase();
  const rawUrl = config.url || "";
  const url = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;

  if (url.includes("/login") && method === "post") {
    const payload = getData(config.data);
    Toast.show({ content: "Mock 登录成功", icon: "success" });
    return {
      ...MOCK_USER,
      username: payload.username || MOCK_USER.username,
    };
  }

  if (url.includes("/users/") && method === "put") {
    const payload = getData(config.data);
    Object.assign(MOCK_USER, payload);
    return {
      ...MOCK_USER,
      updatedAt: new Date().toISOString(),
    };
  }

  if (url === "/classes/ReactBanner" && method === "get") {
    return { results: MOCK_BANNERS };
  }

  if (url === "/classes/ReactCategory" && method === "get") {
    return { results: MOCK_CATEGORIES };
  }

  if (url === "/classes/ReactCourse" && method === "get") {
    const params = config.params || {};
    const where = getWhere(params);
    const limit = toPositiveNumber(params.limit, 4);
    const skip = toPositiveNumber(params.skip, 0);

    let list = [...MOCK_COURSES];
    if (where.level1) {
      list = list.filter((item) => item.level1 === where.level1);
    }
    if (where.level2) {
      list = list.filter((item) => item.level2 === where.level2);
    }

    return {
      results: list.slice(skip, skip + limit),
    };
  }

  if (url.startsWith("/classes/ReactCourse/") && method === "get") {
    const id = url.split("/").pop();
    return MOCK_COURSES.find((item) => item.objectId === id) || MOCK_COURSES[0];
  }

  if (url === "/classes/ReactCollect" && method === "get") {
    const where = getWhere(config.params || {});
    const results = MOCK_COLLECTS.filter((item) => {
      const byUser = where.userId ? item.userId === where.userId : true;
      const byCourse = where.courseId ? item.courseId === where.courseId : true;
      return byUser && byCourse;
    });
    return { results };
  }

  if (url === "/classes/ReactCollect" && method === "post") {
    const payload = getData(config.data);
    const found = MOCK_COLLECTS.find(
      (item) => item.userId === payload.userId && item.courseId === payload.courseId
    );
    if (found) {
      return found;
    }

    const objectId = `collect_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = new Date().toISOString();
    const collect = {
      objectId,
      userId: payload.userId,
      courseId: payload.courseId,
      name: payload.name,
      poster: payload.poster,
      isVip: payload.isVip,
      intro: payload.intro,
      createdAt,
    };
    MOCK_COLLECTS.unshift(collect);
    return {
      objectId,
      createdAt,
    };
  }

  if (url.startsWith("/classes/ReactCollect/") && method === "delete") {
    const id = pickCollectId(url);
    const index = MOCK_COLLECTS.findIndex((item) => item.objectId === id);
    if (index !== -1) {
      MOCK_COLLECTS.splice(index, 1);
    }
    return {
      objectId: id,
      deletedAt: new Date().toISOString(),
    };
  }

  return null;
};

const instance = axios.create({
  baseURL: BASE + "/1.1",
  headers: {
    "X-LC-Id": ID,
    "X-LC-Key": KEY,
    "Content-Type": "application/json",
  }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const mockData = resolveMockData(config);
  if (mockData !== null) {
    return Promise.reject({
      config,
      mockData,
      isMock: true
    } as IMockError);
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.isMock && error.mockData !== undefined) {
    return Promise.resolve({
      data: error.mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: error.config,
    });
  }

  const config = error.config || {};
  const mockData = resolveMockData(config);
  if (mockData !== null) {
    return Promise.resolve({
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    });
  }

  return Promise.reject(error);
});

export default instance;
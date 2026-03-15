import axios from "axios";
import { ID, KEY, BASE } from "../config/index";
import { Toast } from "antd-mobile";
import { MOCK_BANNERS, MOCK_CATEGORIES, MOCK_COURSES, MOCK_USER, MOCK_COLLECTS } from "./mock";

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
  console.log('拦截请求:', config.url);
  const url = config.url || "";
  
  let mockData: any = null;
  if (url.includes("login") || url.includes("users")) {
    if (config.method === 'post' && url.includes("login")) {
      mockData = MOCK_USER;
      Toast.show({ content: 'Mock 登录成功', icon: 'success' });
    } else if (config.method === 'put' && url.includes("users")) {
      mockData = { ...MOCK_USER, updatedAt: new Date().toISOString() };
    }
  } else if (url.includes("/classes/ReactBanner")) {
    mockData = { results: MOCK_BANNERS };
  } else if (url.includes("/classes/ReactCategory")) {
    mockData = { results: MOCK_CATEGORIES };
  } else if (url.includes("/classes/ReactCourse")) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    if (lastPart === "ReactCourse") {
      mockData = { results: MOCK_COURSES };
    } else {
      mockData = MOCK_COURSES.find(c => c.objectId === lastPart) || MOCK_COURSES[0];
    }
  } else if (url.includes("/classes/ReactCollect")) {
    mockData = { results: MOCK_COLLECTS };
  }

  if (mockData) {
    // 关键：返回 rejected promise 以跳过网络请求
    return Promise.reject({
      config,
      mockData,
      isMock: true
    });
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 如果是我们在请求拦截器中标记的 Mock
  if (error.isMock) {
    return Promise.resolve({
      data: error.mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: error.config,
    });
  }
  
  // 兜底：如果请求已经发出去了但失败了，再次尝试匹配
  const config = error.config;
  const url = config?.url || "";
  let mockData: any = null;
  if (url.includes("login")) mockData = MOCK_USER;
  else if (url.includes("/classes/ReactBanner")) mockData = { results: MOCK_BANNERS };
  else if (url.includes("/classes/ReactCategory")) mockData = { results: MOCK_CATEGORIES };
  else if (url.includes("/classes/ReactCourse")) {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    if (lastPart === "ReactCourse") mockData = { results: MOCK_COURSES };
    else mockData = MOCK_COURSES.find(c => c.objectId === lastPart) || MOCK_COURSES[0];
  }

  if (mockData) {
    return Promise.resolve({
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: config,
    });
  }

  return Promise.reject(error);
});

export default instance;
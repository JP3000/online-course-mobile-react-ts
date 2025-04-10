import axios from "axios";
import { ID, KEY, BASE } from "../config/index";
import { Toast } from "antd-mobile";
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
  // 在发送请求之前做些什么
  console.log('请求拦截器');
  // alert('请求成功')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;// 此处的return不能丢，结果会给到发请求的then
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // alert('操作失败');
  console.log("响应拦截器", error);
  // return Promise.reject(error);
});

export default instance;
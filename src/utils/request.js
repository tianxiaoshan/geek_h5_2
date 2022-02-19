import { Toast } from 'antd-mobile';
import axios from 'axios';
import { history } from 'umi';
import { getTokenInfo, setTokenInfo } from './storage';

const baseURL = 'http://toutiao.itheima.net/v1_0/';
// 创建instance实例
const instance = axios.create({
  timeout: 5000,
  baseURL,
});
// 配置拦截器
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    Toast.show({
      icon: 'loading',
      content: '加载中…',
    });
    // 对config做点什么
    // 在请求拦截器统一配置token
    // 获取token ---> 通用配置token
    const token = getTokenInfo().token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    // 对错误做点什么
    return Promise.reject(error);
  },
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    Toast.clear();
    //  对响应做点什么
    return response.data;
  },
  async (err) => {
    if (!err.response) {
      Toast.show({
        content: '网络繁忙，请稍后再试',
      });
      return Promise.reject(err);
    }
    // console.log(err.response.status);
    const { response, config } = err;
    if (response.status !== 401) {
      Toast.show({
        content: err.response.data.message,
      });
      return Promise.reject(err);
    }
    // 处理 401 token 过期的情况
    const { refresh_token } = getTokenInfo();
    // console.log(refresh_token);
    // if (!refresh_token) {
    //   history.push({
    //     pathname: '/login',
    //     state: {
    //       form: history.location.pathname,
    //     },
    //   });
    //   return Promise.reject(err);
    // }

    try {
      // 错误是401 且有刷新token
      // 尝试发送请求 获取新的token 注意： 刷新token发送的请求不能使用封装的instance
      const res = await axios({
        method: 'put',
        url: baseURL + 'authorizations',
        headers: {
          Authorization: 'Bearer ' + refresh_token,
        },
      });
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token,
      };
      setTokenInfo(tokenInfo);

      return instance(config);
    } catch (err) {
      return Promise.reject(err);
    }
  },
);
export default instance;

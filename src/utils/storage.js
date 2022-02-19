// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast-1';
const CHANNEL_KEY = 'geek-itcast-channels';

// 将 Token 信息存入缓存中
// @param{Object}getTokenInfo 从后端获取到的 Token 信息存入缓存中
export const setTokenInfo = (tokenInfo) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo)); // 单词写错 写错
};

// 从本地缓存中获取Token信息
export const getTokenInfo = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY)) || {};
};

// 删除本地缓存中的 Token 信息
export const removeTokenInfo = () => {
  localStorage.removeTokenInfo(TOKEN_KEY);
};

// 判断本地缓存中是否存在 Token 信息

export const hasToken = () => {
  return !!getTokenInfo().token;
};

export const setLocalChannels = (channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels)); // 单词写错 写错
};

// 没有值 发请求
export const getLocalChannels = () => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY));
};

export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY);
};

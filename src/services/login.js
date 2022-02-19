import * as apis from './apis';
import request from '@/utils/request';
// 发送验证码
export async function sendCode(mobile) {
  return request.get(apis.code + mobile);
}
// 用户登录注册
export async function login(data) {
  return request.post(apis.login, data);
}
// 获得用户自己的信息
export async function getProfile() {
  return request.get(apis.profile);
}
// 获取用户个人信息页面的信息
export async function getProfileUser() {
  return request.get(apis.user);
}

// 编辑用户个人信息
export async function editUserInfo(data) {
  return request.patch(apis.edituserinfo, data);
}

// 上传头像
export async function uploadPhoto(data) {
  return request.patch(apis.uploadphoto, data);
}

// 获得用户自己的频道列表
export async function getUserChannels() {
  return request.get(apis.userchannels);
}

// 获得所有的频道列表
export async function getAllChannels() {
  return request.get(apis.allchannels);
}

// 删除用户指定频道
export async function delUserChannels(data) {
  return request.delete(apis.delchannels + data);
}

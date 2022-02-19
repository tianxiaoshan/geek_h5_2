import * as services from '@/services/login';
import { setTokenInfo, getTokenInfo, hasToken, getLocalChannels, setLocalChannels } from '@/utils/storage';

export default {
  namespace: 'login',
  state: {
    loginToken: getTokenInfo(),
    getUserInfo: {},
    getUser: {},
    UserChannels: [],
    getallchannels: [],
  },
  effects: {
    *sendCode({ payload }, { call }) {
      yield call(services.sendCode, payload);
    },
    *login({ payload }, { call, put }) {
      const { data } = yield call(services.login, payload);
      // 把token保存在本地
      setTokenInfo(data);
      yield put({
        type: 'save',
        payload: { loginToken: data },
      });
    },
    *getProfile({ payload }, { call, put }) {
      const { data } = yield call(services.getProfile, payload);
      yield put({
        type: 'save',
        payload: { getUserInfo: data },
      });
    },
    *getProfileUser({ payload }, { call, put }) {
      const { data } = yield call(services.getProfileUser, payload);
      yield put({
        type: 'save',
        payload: { getUser: data },
      });
    },
    *editUserInfo({ payload }, { call, put }) {
      try {
        yield call(services.editUserInfo, payload);
        yield put({
          type: 'getProfileUser',
          payload: { getUserInfo: payload },
        });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *uploadPhoto({ payload }, { call, put }) {
      try {
        yield call(services.uploadPhoto, payload);
        yield put({
          type: 'getProfileUser',
          payload: { getUserInfo: payload },
        });
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *getUserChannels({ payload }, { call, put }) {
      const {
        data: { channels },
      } = yield call(services.getUserChannels, payload);
      console.log(channels);
      yield put({
        type: 'save',
        payload: { UserChannels: channels },
      });
    },
    *getAllChannels({ payload }, { call, put }) {
      try {
        // 如果有token
        if (hasToken()) {
          const {
            data: { channels },
          } = yield call(services.getAllChannels, payload);
          yield put({
            type: 'save',
            payload: { getallchannels: channels },
          });
          setLocalChannels(channels);
        } else {
          // 2 没有token 从本地缓存中获取channels
          const { channels } = getLocalChannels();
          if (channels) {
            // 没有token 但是本地有channels数据
            yield put({
              type: 'save',
              payload: { getallchannels: channels },
            });
          } else {
            // 没有token 且本地没有channels数据
            const {
              data: { channels },
            } = yield call(services.getAllChannels, payload);

            yield put({
              type: 'save',
              payload: { getallchannels: channels },
            });

            // 保存到本地
            setLocalChannels(channels);
          }
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject();
      }
    },
    *delUserChannels({ payload }, { call, put }) {
      yield call(services.delUserChannels, payload);
      yield put({
        type: 'getUserChannels',
        payload: { UserChannels: [payload] },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

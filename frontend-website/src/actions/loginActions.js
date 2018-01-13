import * as types from '../constants/actionTypes';

export function setAuth(userInfo) {
  return {
    type: types.SET_AUTH,
    userInfo: userInfo
  };
}

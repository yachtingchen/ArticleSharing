import {SET_AUTH} from '../constants/actionTypes';
import Auth from '../modules/Auth';
import initialState from './initialState';

export default function loggedInUserReducer(state = Auth.getLoggedInUser(), action) {
  if (!state){
    state = initialState.loggedInUser;
  }

  switch (action.type) {
    case SET_AUTH:
      return action.userInfo;
    default:
      return state;
  }
}

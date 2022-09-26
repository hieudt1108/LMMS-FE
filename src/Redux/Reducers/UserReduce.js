import * as Actions from "../Actions/ActionTypes";
import {getLocalStorage} from "../../Api"

const localUser = getLocalStorage("user_info");

export const user = (state = localUser, action) => {
  
  switch (action.type) {
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
};

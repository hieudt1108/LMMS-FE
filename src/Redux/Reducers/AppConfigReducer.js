import * as Actions from "../Actions/ActionTypes";

export const appConfig = (state= {}, action) => {
  switch (action.type) {
    case Actions.UPDATE_CLASSROOM:
      return {...action.config};
    default: return state;
  }
}
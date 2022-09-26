import { combineReducers } from "redux";
import { appConfig } from "./AppConfigReducer";
import { user } from "./UserReduce";

export const rootReducer = combineReducers({ appConfig, user });

import { combineReducers } from "redux";
import userReducer from "./UserReducer";

const rootReducer = combineReducers<any>({
	userCart: userReducer,
});

export default rootReducer;

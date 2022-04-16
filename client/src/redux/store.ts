import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

const appStore = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware())
);
export default appStore;

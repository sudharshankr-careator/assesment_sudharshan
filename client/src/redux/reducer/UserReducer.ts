import { Action } from "redux";
import { Store } from "../../types";
import UserAction from "../action/UserAction";

interface IAction extends Action {
	amount: 0;
}
const initialState: Store = { totalAmount: 0 };
function userReducer(storeData: Store = initialState, action: IAction): any {
	switch (action.type) {
		case UserAction.ActionTypes.TOTAL_AMOUNT:
			return {
				...storeData,
				totalAmount: storeData.totalAmount + action.amount,
			};
		default:
			return storeData;
	}
}

export default userReducer;

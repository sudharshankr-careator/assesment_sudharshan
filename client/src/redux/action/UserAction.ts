const ActionTypes = {
	TOTAL_AMOUNT: "TOTAL_AMOUNT",
};

const cartAmount = (amount: number) => {
	return {
		type: ActionTypes.TOTAL_AMOUNT,
		amount,
	};
};
const UserAction = { cartAmount, ActionTypes };
export default UserAction;

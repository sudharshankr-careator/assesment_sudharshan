import Cart from "./Cart";
import CouponList from "./CouponList";
import Items from "./Items";

function FinalLayout() {
	return (
		<div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
			<div>
				<Items />
			</div>
			<div>
				<Cart />
				<br />
				<CouponList />
			</div>
		</div>
	);
}

export default FinalLayout;

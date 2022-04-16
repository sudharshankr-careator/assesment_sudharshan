import { Route, Routes } from "react-router-dom";
import CouponForm from "./component/CouponForm";
import FinalLayout from "./component/FinalLayout";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<FinalLayout />} />
				<Route path="/createCoupon" element={<CouponForm />} />
			</Routes>
		</div>
	);
}

export default App;

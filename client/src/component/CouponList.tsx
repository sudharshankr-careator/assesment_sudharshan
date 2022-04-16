import { useQuery } from "@apollo/client";
import { Button, Card, message } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CONSTANTS from "../constant";
import CouponService from "../service/CouponService";
function CouponList() {
	const { data, loading, refetch } = useQuery(CouponService.GET_COUPON_DATA);
	const nav = useNavigate();
	// console.log(data.allcoupon);
	if (loading) {
		<h1>Loading...</h1>;
	}
	useEffect(() => {
		refetch();
	}, []);

	return (
		<div className="site-card-border-less-wrapper">
			<div>
				<Button
					className="button"
					type="primary"
					onClick={() => nav("/createCoupon")}
				>
					Create Coupon
				</Button>
			</div>
			<Card
				bordered={true}
				style={{
					width: 330,
					height: "100%",
					border: "3px solid black",
					backgroundColor: "whitesmoke",
					boxShadow: "0px 5px 5px 5px  grey",
					transform: "translate(20%, 10%)",
					marginTop: "-2rem",
				}}
			>
				<h2 style={{ textAlign: "center" }}>Coupons</h2> <hr />
				{data &&
					data.allcoupon &&
					data.allcoupon.map((val: any, index: any) => (
						<Card
							style={{
								width: 250,
								height: 150,
								border: " 5px dotted #bbb",
								borderRadius: "5%",
								marginTop: "5px",
							}}
							key={index + 1}
						>
							<button
								style={{
									fontSize: "16px",
									fontWeight: 900,
									letterSpacing: "10px",
									background: "#ccc",
									padding: "3px",
									cursor: "pointer",
								}}
								onClick={() => {
									navigator.clipboard.writeText(val.couponcode);
									message.success("Coupon Copied to ClipBoard");
								}}
								// onCopy={val.couponcode}
							>
								{val.couponcode}
							</button>
							<p>
								Get Flat {val.couponvalue}{" "}
								{val.coupontype == "FLAT" ? <span>&#8377;</span> : "%"} on
								adding Min cart Value {val.couponminvalue}
							</p>
							<p
								style={{
									color: "red",
								}}
							>
								Expires: {moment(val.enddate).format(CONSTANTS.DATE_FORMAT)}
							</p>
						</Card>
					))}
			</Card>
		</div>
	);
}

export default CouponList;

import { useLazyQuery } from "@apollo/client";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../App.css";
import CouponService from "../service/CouponService";
function Cart() {
	type LayoutType = Parameters<typeof Form>[0]["layout"];
	const [formLayout] = useState<LayoutType>("vertical");
	const cartValue = useSelector((store: any) => store.userCart.totalAmount);

	console.log(cartValue);
	const { Text } = Typography;
	const [errors, seterror] = useState("");
	const [coupon1, data] = useLazyQuery(CouponService.VALIDATE_COUPON);

	console.log(data, "coupon value");
	const [form] = Form.useForm();
	const formItemLayout =
		formLayout === "vertical"
			? {
					labelCol: { span: 16 },
					wrapperCol: { span: 20 },
			  }
			: null;
	const onFinish = async (values: any) => {
		console.log(values);
		coupon1({
			variables: {
				couponcode: values.couponcode,
				cartamt: Number(cartValue),
			},
		});
	};
	useEffect(() => {
		if (data.error) {
			seterror(data.error?.message.toString());
		}
	}, [data.error]);
	if (data.loading) return <h1>Loading...</h1>;
	if (data.error) return <h1>error</h1>;

	console.log();
	return (
		<div className="site-card-border-less-wrapper">
			<Card
				bordered={true}
				style={{
					width: 300,
					height: 420,
					border: "3px solid black",
					backgroundColor: "whitesmoke",
					boxShadow: "0px 5px 5px 5px  grey",

					transform: "translate(20%, 10%)",
				}}
			>
				<h2 style={{ textAlign: "center" }}>CHECK OUT</h2> <hr />
				<Form
					form={form}
					onFinish={onFinish}
					name="basic"
					{...formItemLayout}
					layout={formLayout}
					initialValues={{
						remember: true,
					}}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={12} xl={12}>
							<Text type="danger" style={{ width: "5rem" }}>
								{errors}
							</Text>
							<Form.Item
								className="formfiled1"
								name="couponcode"
								rules={[
									{
										required: true,
										message: "Please Enter Coupon Code",
									},
								]}
							>
								<Input
									type="text"
									className="formfiled1"
									placeholder="Enter Coupon Code"
								/>
							</Form.Item>
						</Col>
					</Row>
					<Button
						type="primary"
						htmlType="submit"
						disabled={cartValue == 0 ? true : false}
					>
						Apply Coupon
					</Button>
				</Form>
				<p>
					Items Total Amount: <span> &#8377;{cartValue}</span>
				</p>
				<p>
					Coupon Discount:{" "}
					<span>
						{" "}
						&#8377;
						{!data?.data
							? 0
							: data?.data.couponCode?.coupontype == "FLAT"
							? data?.data?.couponCode?.couponvalue
							: data?.data?.couponCode?.couponvalue + "%"}
					</span>
				</p>
				<p>
					Amount Payable:{" "}
					<span>
						{" "}
						&#8377;{" "}
						{!data?.data
							? 0
							: data?.data.couponCode?.coupontype == "FLAT"
							? cartValue - data?.data?.couponCode?.couponvalue
							: cartValue -
							  cartValue * (1 / data?.data?.couponCode?.couponvalue)}
					</span>
				</p>
			</Card>
		</div>
	);
}

export default Cart;

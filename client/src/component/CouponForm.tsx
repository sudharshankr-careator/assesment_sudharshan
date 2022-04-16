import { FC, useState } from "react";

import { useMutation } from "@apollo/client";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CONSTANTS from "../constant";
import CouponService from "../service/CouponService";

const { Option } = Select;
const CouponForm: FC = () => {
	type LayoutType = Parameters<typeof Form>[0]["layout"];
	const [formLayout] = useState<LayoutType>("vertical");
	const [form] = Form.useForm();
	const nav = useNavigate();
	const [create] = useMutation(CouponService.COUPON_DATA);
	const formItemLayout =
		formLayout === "vertical"
			? {
					labelCol: { span: 16 },
					wrapperCol: { span: 20 },
			  }
			: null;
	const config = {
		rules: [
			{
				type: "object" as const,
				required: true,
				message: "Please select Date!",
			},
		],
	};
	const onFinish = async (values: any) => {
		console.log(values);
		try {
			await create({
				variables: {
					createCouponInput: {
						couponcode: values.couponcode,
						couponminvalue: Number(values.couponminvalue),
						coupontype: values.coupontype,
						couponvalue: Number(values.couponvalue),
						startdate: values.startdate._d,
						enddate: values.enddate._d,
					},
				},
			});
			await nav("/");
		} catch (e: any) {
			console.log(e);
		}
	};
	return (
		<div>
			<div className="site-card-border-less-wrapper">
				<Card
					title="CREATE COUPON"
					bordered={true}
					style={{
						width: 800,
						border: "3px solid black",
						backgroundColor: "whitesmoke",
						// top: "-50%",
						// left: "50%",
						// marginRight: "-25%",
						transform: "translate(0, 10%)",
					}}
				>
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
								<Form.Item
									className="formfiled"
									label="Coupon Code"
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
										className="formfiled"
										placeholder="Enter couponcode"
									/>
								</Form.Item>
							</Col>

							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<Form.Item
									className="formfiled"
									label="Coupon Value"
									name="couponvalue"
									rules={[
										{
											required: true,
											message: "Please Enter couponvalue",
										},
									]}
								>
									<Input
										type="number"
										className="formfiled"
										placeholder="Enter Coupon Value"
									/>
								</Form.Item>
							</Col>
						</Row>

						<Row>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<Form.Item
									className="formfiled"
									label="Coupon Minimum Value"
									name="couponminvalue"
									rules={[
										{
											required: true,
											message: "Please Enter coupon Minimum Value",
										},
									]}
								>
									<Input
										type="number"
										className="formfiled"
										placeholder="Enter coupon Minimum Value"
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<Form.Item
									className="formfiled"
									label="Coupon Type"
									name="coupontype"
									rules={[
										{
											required: true,
											message: "Please Enter Coupon Type",
										},
									]}
								>
									<Select
										placeholder="Please Select One"
										style={{ width: "100%" }}
									>
										<Option value="FLAT">FLAT</Option>
										<Option value="PERCENTAGE">PERCENTAGE</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<Form.Item
									className="formfiled"
									name={"startdate"}
									label="Coupon Valid From"
									{...config}
									rules={[
										{
											required: true,
											message: "Please Select Coupon Valid From",
										},
									]}
								>
									<DatePicker
										placeholder="Please Select Coupon Valid From"
										style={{ width: "100%" }}
										format={CONSTANTS.DATE_FORMAT}
									/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={12} xl={12}>
								<Form.Item
									className="formfiled"
									name={"enddate"}
									label="Coupon Expires On"
									{...config}
									rules={[
										{
											required: true,
											message: "Please Select Date Of Expire",
										},
									]}
								>
									<DatePicker
										placeholder=" Select Date Of Coupon Expiry"
										style={{ width: "100%" }}
										format={CONSTANTS.DATE_FORMAT}
										disabledDate={(d) => d < form.getFieldValue("startdate")}
										//
									/>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col md={{ span: 5, offset: 6 }}>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										style={{
											width: "100%",
											borderRadius: ".35rem",
										}}
									>
										Submit
									</Button>
								</Form.Item>
							</Col>
							<Col md={{ span: 5, offset: 1 }}>
								<Form.Item>
									<Button
										type="primary"
										style={{ width: "100%", borderRadius: ".35rem" }}
										onClick={() => {
											nav(-1);
										}}
										danger
									>
										Cancel
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Card>
			</div>
		</div>
	);
};

export default CouponForm;

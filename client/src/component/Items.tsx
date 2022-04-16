import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserAction from "../redux/action/UserAction";
const { Meta } = Card;
export interface Beverage {
	name: string;
	producerName: string;
	beverageName: string;
	beverageColor: string;
	beverageStyle: string;
	producerLocation: string;
	abv: number;
	ibu: number;
	logo: string;
	level: number;
	price: number;
}
function useFetchData<Payload>(url: string): {
	data: Payload | null;
	done: boolean;
} {
	const [data, dataSet] = useState<Payload | null>(null);
	const [done, doneSet] = useState(false);
	useEffect(() => {
		fetch(url)
			.then((resp) => resp.json())
			.then((d: Payload) => {
				dataSet(d);
				doneSet(true);
			});
	}, [url]);

	return {
		data,
		done,
	};
}
const Items: FC = () => {
	const dispatch = useDispatch();
	const { data } = useFetchData<Beverage[]>("/items-taplist.json");
	console.log(data);
	return (
		<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
			{(data || []).map((bev, index) => (
				<Card
					style={{
						width: 230,
						height: 240,
						marginLeft: "10px",
						marginTop: "20px",
						backgroundColor: "whitesmoke",
						justifyContent: "space-around",
					}}
					key={index + 1}
					actions={[
						<h2>&#8377; : {bev.price}</h2>,
						<ShoppingCartOutlined
							className="cart"
							style={{ fontSize: "26px", color: "#08c" }}
							key={index + 1}
							onClick={() => dispatch(UserAction.cartAmount(bev.price))}
						/>,
					]}
				>
					<Meta
						avatar={<Avatar src={bev.logo} />}
						title={bev.beverageName}
						description={`Beverage Name:-${bev.beverageName}, Producer Name:-${bev.producerName}, Producer Location:-${bev.producerLocation}`}
					/>
				</Card>
			))}
		</div>
	);
};

export default Items;

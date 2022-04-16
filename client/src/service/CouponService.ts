import { gql } from "@apollo/client";

const COUPON_DATA = gql`
	mutation Mutation($createCouponInput: CreateCouponInput!) {
		createCoupon(createCouponInput: $createCouponInput) {
			id
		}
	}
`;

const GET_COUPON_DATA = gql`
	query ExampleQuery {
		allcoupon {
			id
			couponcode
			couponvalue
			couponminvalue
			coupontype
			startdate
			enddate
			createdat
		}
	}
`;
const VALIDATE_COUPON = gql`
	query CouponCode($cartamt: Float!, $couponcode: String!) {
		couponCode(cartamt: $cartamt, couponcode: $couponcode) {
			id
			couponcode
			couponvalue
			couponminvalue
			coupontype
			startdate
			enddate
			createdat
		}
	}
`;

const CouponService = {
	COUPON_DATA,
	GET_COUPON_DATA,
	VALIDATE_COUPON,
};
export default CouponService;

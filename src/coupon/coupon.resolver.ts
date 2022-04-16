import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { Coupon } from './entities/coupon.entity';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private couponService: CouponService) {}

  @Mutation(() => Coupon)
  createCoupon(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return this.couponService.create(createCouponInput);
  }

  @Query(() => [Coupon], { name: 'allcoupon' })
  findAll() {
    return this.couponService.findAll();
  }

  @Query(() => Coupon, { name: 'coupon' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.couponService.findOne(id);
  }

  @Query(() => Coupon, { name: 'couponCode' })
  findOneCoupon(
    @Args('cartamt', { type: () => Number }) cartamt: number,
    @Args('couponcode', { type: () => String }) couponcode: string,
  ) {
    return this.couponService.validateCoupon(couponcode, cartamt);
  }

  @Mutation(() => Coupon)
  updateCoupon(
    @Args('updateCouponInput') updateCouponInput: UpdateCouponInput,
  ) {
    return this.couponService.update(updateCouponInput.id, updateCouponInput);
  }

  @Mutation(() => Coupon)
  removeCoupon(@Args('id', { type: () => Int }) id: number) {
    return this.couponService.remove(id);
  }
}

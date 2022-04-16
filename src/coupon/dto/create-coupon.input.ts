import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field({ nullable: true })
  couponcode?: string;

  @Field({ nullable: true })
  couponvalue?: number;

  @Field({ nullable: true })
  couponminvalue?: number;

  @Field({ nullable: true })
  coupontype?: string;

  @Field({ nullable: true })
  startdate?: Date;

  @Field({ nullable: true })
  enddate?: Date;
}

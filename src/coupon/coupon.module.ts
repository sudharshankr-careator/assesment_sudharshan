import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponResolver, CouponService],
})
export class CouponModule {}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private couponrepo: Repository<Coupon>,
  ) {}
  create(createCouponInput: CreateCouponInput) {
    const CREATE = this.couponrepo.create(createCouponInput);
    return this.couponrepo.save(CREATE);
  }

  findAll() {
    return this.couponrepo.find();
  }

  findOne(id: any) {
    return this.couponrepo.findOne(id);
  }
  async findOneCoupon(couponcode: string) {
    return await this.couponrepo.findOne({
      where: {
        couponcode: couponcode,
      },
    });
  }
  async validateCoupon(couponcode: string, cartamt: number) {
    console.log(couponcode, cartamt);
    const cou = await this.findOneCoupon(couponcode);
    if (!cou) {
      throw new HttpException(
        { message: 'Invalid Coupon/Coupon Not Found' },
        401,
      );
    }
    const D1 = new Date(cou.startdate);
    const D2 = new Date(cou.enddate);
    const D3 = new Date();

    if (D3.getTime() > D2.getTime()) {
      throw new HttpException({ message: 'Coupon Expired' }, 401);
    } else if (D3.getTime() < D1.getTime()) {
      throw new HttpException({ message: 'Coupon yet to be valid' }, 401);
    }
    if (cartamt < cou.couponminvalue) {
      throw new HttpException(
        { message: 'Cart Total Value should be more than Coupon Min Value' },
        401,
      );
    }

    console.log(cou);

    return cou;
  }
  update(id: number, updateCouponInput: UpdateCouponInput) {
    const UPDATE = this.couponrepo.create(updateCouponInput);
    return this.couponrepo.update(id, UPDATE);
  }

  remove(id: number) {
    return this.couponrepo.delete(id);
  }
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Coupon {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  couponcode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  couponvalue: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  couponminvalue: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coupontype: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startdate: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  enddate: Date;

  @Field()
  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdat: Date;
}

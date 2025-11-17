import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { PaymentAction } from '../../../common/enums/payment-action.enum';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments, { nullable: false })
  user: User;

  @Column({
    type: 'enum',
    enum: PaymentAction,
  })
  action: PaymentAction;

  @Column('numeric', { precision: 12, scale: 2 })
  amount: string;

  @CreateDateColumn({ name: 'ts' })
  ts: Date;
}
export { PaymentAction };

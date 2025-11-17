import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentAction } from '../../common/enums/payment-action.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Payment)
    private readonly paymentsRepo: Repository<Payment>,
    private readonly dataSource: DataSource
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async findUserById(userId: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id: userId } });
  }

  async addPaymentAndRecalculateBalance(
    userId: number,
    action: PaymentAction,
    amount: number
  ): Promise<User> {
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      if (!user) throw new Error('User not found');

      const payment = manager.create(Payment, {
        user,
        action,
        amount: amount.toFixed(2),
      });
      await manager.save(payment);

      const payments = await manager.find(Payment, {
        where: { user: { id: userId } },
        order: { ts: 'ASC' },
      });

      const balanceNumber = payments.reduce((acc, p) => {
        const value = Number(p.amount);
        return p.action === PaymentAction.CREDIT ? acc + value : acc - value;
      }, 0);

      user.balance = balanceNumber.toFixed(2);
      return manager.save(user);
    });
  }
}

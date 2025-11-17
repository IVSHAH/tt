import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { ChargeBalanceDto } from './dto/charge-balance.dto';
import { PaymentAction } from '../../common/enums/payment-action.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  private getCacheKey(userId: number): string {
    return `user:${userId}:balance`;
  }

  async createUser(): Promise<User> {
    // todo: просто для удобства чтобы через ручку сгенерить стартового пользователя
    const user = await this.usersRepository.createUser({
      balance: '0.00',
    });

    return user;
  }

  async getBalance(userId: number) {
    const cacheKey = this.getCacheKey(userId);

    const cachedBalance = await this.cacheManager.get<string>(cacheKey);

    if (cachedBalance !== undefined && cachedBalance !== null) {
      return {
        userId,
        balance: cachedBalance,
        source: 'cache' as const,
      };
    }

    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.cacheManager.set(cacheKey, user.balance);

    return {
      userId: user.id,
      balance: user.balance,
      source: 'db' as const,
    };
  }

  async charge(userId: number, dto: ChargeBalanceDto) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const currentBalance = Number(user.balance);

    if (dto.action === PaymentAction.DEBIT && currentBalance < dto.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const updatedUser = await this.usersRepository.addPaymentAndRecalculateBalance(
      userId,
      dto.action,
      dto.amount
    );

    await this.cacheManager.del(this.getCacheKey(userId));

    return {
      userId: updatedUser.id,
      balance: updatedUser.balance,
    };
  }
}

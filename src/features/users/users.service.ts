import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ChargeBalanceDto } from './dto/charge-balance.dto';
import { PaymentAction } from '../../common/enums/payment-action.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getBalance(userId: number) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      userId: user.id,
      balance: user.balance,
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

    return {
      userId: updatedUser.id,
      balance: updatedUser.balance,
    };
  }
}

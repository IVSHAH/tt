import { IsEnum, IsNumber, IsPositive } from 'class-validator';

export type PaymentAction = 'CREDIT' | 'DEBIT';

export class ChargeBalanceDto {
  @IsEnum(['CREDIT', 'DEBIT'])
  action: PaymentAction;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;
}

import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { PaymentAction } from '../../../common/enums/payment-action.enum';

export class ChargeBalanceDto {
  @IsEnum(PaymentAction)
  action: PaymentAction;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;
}

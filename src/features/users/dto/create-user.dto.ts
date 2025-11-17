import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  balance?: number;
}

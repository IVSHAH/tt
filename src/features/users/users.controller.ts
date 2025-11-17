import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ChargeBalanceDto } from './dto/charge-balance.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/balance')
  getBalance(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getBalance(id);
  }
  @Post(':id/charge')
  charge(@Param('id', ParseIntPipe) id: number, @Body() dto: ChargeBalanceDto) {
    return this.usersService.charge(id, dto);
  }
}

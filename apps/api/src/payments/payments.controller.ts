import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.createPayment(body);
  }
}
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  calculateFee(amountCents: number, percentage: number, minFee: number) {
    const percentValue = Math.floor(amountCents * (percentage / 100));

    return Math.max(percentValue, minFee);
  }

  async createPayment(data: any) {
    const fee = this.calculateFee(
      data.amountCents,
      data.percentage,
      data.minFee,
    );

    return this.prisma.payment.create({
  data: {
    amount_cents: data.amountCents,
    fee_cents: fee,
    status: 'PENDING',

    registration: {
      connect: {
        id: data.registrationId,
      },
    },

    organization: {
      connect: {
        id: data.organizationId,
      },
    },
  },
});
    }
}
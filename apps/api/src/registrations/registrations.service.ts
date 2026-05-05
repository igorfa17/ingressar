import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(private prisma: PrismaService) {}

  async create(orgId: string, data: any) {
    return this.prisma.registration.create({
      data: {
        organization_id: orgId,
        event_id: data.eventId,
        ticket_tier_id: data.ticketTierId,
        participant_name: data.name,
        participant_email: data.email,
      },
    });
  }
}
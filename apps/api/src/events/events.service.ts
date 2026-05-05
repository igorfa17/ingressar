import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, orgId: string, data: any) {
    const slug = data.title.toLowerCase().replace(/\s+/g, '-');

    return this.prisma.event.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        starts_at: new Date(data.startsAt),
        ends_at: new Date(data.endsAt),
        created_by: userId,
        organization_id: orgId,
      },
    });
  }

  async createTicket(orgId: string, eventId: string, data: any) {
  return this.prisma.ticketTier.create({
    data: {
      name: data.name,
      price_cents: data.priceCents,
      event_id: eventId,
      organization_id: orgId,
    },
  });
}

}


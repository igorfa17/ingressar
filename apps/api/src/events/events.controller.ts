import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Headers,
  Param,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(
    @Req() req,
    @Body() body: any,
    @Headers('x-organization-id') orgId: string,
  ) {
    const userId = req.user.sub;

    return this.eventsService.create(userId, orgId, body);
  }

  @Post(':eventId/tickets')
  createTicket(
    @Req() req,
    @Param('eventId') eventId: string,
    @Body() body: any,
    @Headers('x-organization-id') orgId: string,
  ) {
    return this.eventsService.createTicket(orgId, eventId, body);
  }
}
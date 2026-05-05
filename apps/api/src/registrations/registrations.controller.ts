import {
  Body,
  Controller,
  Post,
  Headers,
} from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private service: RegistrationsService) {}

  @Post()
  create(
    @Body() body: any,
    @Headers('x-organization-id') orgId: string,
  ) {
    return this.service.create(orgId, body);
  }
}
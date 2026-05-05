import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('organizations')
export class OrganizationsController {
  constructor(private orgService: OrganizationsService) {}

  @Post()
  create(@Req() req, @Body() body: any) {
    const userId = req.user.sub;

    return this.orgService.create(userId, body.name);
  }
}
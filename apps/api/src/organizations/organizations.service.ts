import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, name: string) {
  if (!name) {
    throw new Error('Name is required');
  }

  const baseSlug = name.toLowerCase().replace(/\s+/g, '-');

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const exists = await this.prisma.organization.findUnique({
      where: { slug },
    });

    if (!exists) break;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return this.prisma.organization.create({
    data: {
      name,
      slug,
      created_by: userId,
      members: {
        create: {
          user_id: userId,
          role: 'OWNER',
        },
      },
    },
  });
}
}
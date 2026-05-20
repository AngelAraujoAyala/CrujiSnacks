import { Module } from '@nestjs/common';

import { BloqueosController } from './bloqueos.controller';

import { BloqueosService } from './bloqueos.service';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BloqueosController],

  providers: [BloqueosService, PrismaService],
})
export class BloqueosModule {}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBloqueoDto } from './dto/create-bloqueo.dto';

@Injectable()
export class BloqueosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBloqueoDto) {
    // CREAR FECHA LOCAL
    const fechaLocal = new Date(`${data.fecha}T00:00:00`);

    return this.prisma.bloqueoFecha.create({
      data: {
        fecha: fechaLocal,

        horaInicio: data.horaInicio,

        horaFin: data.horaFin,

        motivo: data.motivo,
      },
    });
  }

  async findAll() {
    return this.prisma.bloqueoFecha.findMany({
      orderBy: {
        fecha: 'asc',
      },
    });
  }
}

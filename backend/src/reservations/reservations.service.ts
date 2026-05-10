import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ReservationsService {
  // Inyectamos el servicio de Prisma que creamos antes
  constructor(private prisma: PrismaService) { }

  async create(data: CreateReservationDto) {
    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        fecha: data.fecha,
        hora: data.hora,
      },
    });

    if (existingReservation) {
      throw new ConflictException('Este horario ya está reservado.');
    }

    return this.prisma.reservation.create({ data });
  }

  async findAll() {
    return await this.prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
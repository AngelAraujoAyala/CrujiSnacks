import { Injectable, ConflictException } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationDto) {
    // Verificar si ya existe reserva en la misma fecha/hora
    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        fecha: new Date(data.fecha),
      },
    });

    if (existingReservation) {
      throw new ConflictException('Este horario ya está reservado.');
    }

    return this.prisma.reservation.create({
      data: {
        nombreCliente: data.nombreCliente,
        emailCliente: data.emailCliente,
        telefono: data.telefono,
        fecha: new Date(data.fecha),
        lugar: data.lugar,
      },
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        toppings: {
          include: {
            topping: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.reservation.findUnique({
      where: { id },

      include: {
        toppings: {
          include: {
            topping: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, estado: string) {
    return this.prisma.reservation.update({
      where: { id },

      data: {
        estado: estado as any,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}

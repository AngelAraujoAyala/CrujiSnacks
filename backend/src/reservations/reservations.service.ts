import { Injectable, ConflictException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationDto) {
    const fechaInicio = new Date(data.fechaInicio);

    const fechaFin = new Date(data.fechaFin);

    // VALIDAR OVERLAPS
    const overlappingReservation = await this.prisma.reservation.findFirst({
      where: {
        AND: [
          {
            fechaInicio: {
              lt: fechaFin,
            },
          },
          {
            fechaFin: {
              gt: fechaInicio,
            },
          },
        ],
      },
    });

    if (overlappingReservation) {
      throw new ConflictException('Ya existe una reserva en ese horario.');
    }

    // VALIDAR BLOQUEOS
    const bloqueos = await this.prisma.bloqueoFecha.findMany({
      where: {
        activo: true,
      },
    });

    const hayBloqueo = bloqueos.some((bloqueo) => {
      const onlyDate = bloqueo.fecha.toISOString().split('T')[0];

      const bloqueoDate = new Date(`${onlyDate}T00:00:00`);

      return fechaInicio.toDateString() === bloqueoDate.toDateString();
    });

    if (hayBloqueo) {
      throw new ConflictException('La fecha seleccionada está bloqueada.');
    }

    // CREAR RESERVA
    return this.prisma.reservation.create({
      data: {
        nombreCliente: data.nombreCliente,

        emailCliente: data.emailCliente,

        telefono: data.telefono,

        fechaInicio,
        fechaFin,

        lugar: data.lugar,

        packageId: data.packageId,

        estado: data.estado ?? 'PENDIENTE',

        toppings: {
          create: data.toppingsIds.map((toppingId) => ({
            toppingId,
          })),
        },
      },

      include: {
        package: true,

        toppings: {
          include: {
            topping: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        package: true,

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
        package: true,

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
    // ELIMINAR RELACIONES PRIMERO
    await this.prisma.reservaTopping.deleteMany({
      where: {
        reservaId: id,
      },
    });

    return this.prisma.reservation.delete({
      where: { id },
    });
  }
}

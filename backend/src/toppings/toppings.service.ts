import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';

@Injectable()
export class ToppingsService {
  constructor(private prisma: PrismaService) { } // Inyecta Prisma

  // Para que el cliente vea qué toppings puede elegir
  findAll() {
    return this.prisma.topping.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  // Para que la dueña pueda activar/desactivar el stock
  update(id: number, updateToppingDto: UpdateToppingDto) {
    return this.prisma.topping.update({
      where: { id },
      data: updateToppingDto,
    });
  }

  create(createToppingDto: CreateToppingDto) {
    return this.prisma.topping.create({
      data: createToppingDto,
    });
  }
}
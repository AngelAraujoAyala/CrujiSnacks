import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';

@Injectable()
export class ToppingsService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.topping.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async update(id: number, updateToppingDto: UpdateToppingDto) {
    return await this.prisma.topping.update({
      where: { id },
      data: updateToppingDto,
    });
  }

  create(createToppingDto: CreateToppingDto) {
    return this.prisma.topping.create({
      data: createToppingDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.topping.delete({
      where: { id },
    });
  }
}
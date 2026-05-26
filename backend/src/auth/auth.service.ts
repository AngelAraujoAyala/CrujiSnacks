import {
  Injectable,
  UnauthorizedException,
  NotFoundException, // <--- Esto elimina el error 'Cannot find name'
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isMatch = await bcrypt.compare(pass, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: admin.id, email: admin.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getPublicConfig() {
    // Si da error aquí, ejecuta 'npx prisma generate' en tu terminal
    const admin = await this.prisma.admin.findFirst({
      select: { whatsappNumber: true },
    });
    if (!admin) return { whatsappNumber: '526624509876' };
    return admin;
  }

  async getProfile(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: { email: true, whatsappNumber: true },
    });
    if (!admin) throw new NotFoundException('Administrador no encontrado');
    return admin;
  }

  async updateProfile(
    id: number,
    data: { email: string; password?: string; whatsappNumber: string },
  ) {
    // Usamos el tipo exacto de Prisma para evitar conflictos de ESLint
    const updateData: Prisma.AdminUpdateInput = {
      email: data.email,
      whatsappNumber: data.whatsappNumber,
    };

    if (data.password && data.password.trim() !== '') {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.admin.update({
      where: { id },
      data: updateData,
      select: { email: true, whatsappNumber: true },
    });
  }
}

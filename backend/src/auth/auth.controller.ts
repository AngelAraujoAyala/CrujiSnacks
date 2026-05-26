import { JwtAuthGuard } from './jwt-auth.guard';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Put,
  Request as NestRequest,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email?: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  // 1. RUTA PÚBLICA: El formulario de reservas lee el número sin estar logueado
  @Get('public-config')
  async getPublicConfig() {
    return this.authService.getPublicConfig();
  }

  // 2. RUTA PROTEGIDA: Obtener datos actuales de la dueña
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@NestRequest() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.userId);
  }

  // 3. RUTA PROTEGIDA: Actualizar credenciales y configuración
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @NestRequest() req: AuthenticatedRequest,
    @Body()
    updateDto: { email: string; password?: string; whatsappNumber: string },
  ) {
    return this.authService.updateProfile(req.user.userId, updateDto);
  }
}

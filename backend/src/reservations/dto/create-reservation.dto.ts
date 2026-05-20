import {
  IsString,
  IsDateString,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';

import { ReservaEstado } from '@prisma/client';

export class CreateReservationDto {
  @IsString()
  nombreCliente: string;

  @IsString()
  emailCliente: string;

  @IsString()
  telefono: string;

  @IsDateString()
  fecha: string;

  @IsString()
  lugar: string;

  @IsOptional()
  @IsEnum(ReservaEstado)
  estado?: ReservaEstado;

  @IsOptional()
  @IsArray()
  toppingsIds?: number[];
}

import { IsDate, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBloqueoDto {
  @Type(() => Date)
  @IsDate()
  fecha: string;

  @IsString()
  @IsOptional()
  horaInicio?: string;

  @IsString()
  @IsOptional()
  horaFin?: string;

  @IsString()
  @IsOptional()
  motivo?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

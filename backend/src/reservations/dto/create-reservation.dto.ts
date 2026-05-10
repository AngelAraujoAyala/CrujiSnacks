import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator';

export class CreateReservationDto {
    @IsString() @IsNotEmpty()
    nombreCliente: string;

    @IsString() @IsNotEmpty()
    whatsapp: string;

    @IsString() @IsEmail()
    email: string;

    @IsString() @IsNotEmpty()
    fecha: string;

    @IsString() @IsNotEmpty()
    hora: string;

    @IsString() @IsNotEmpty()
    ubicacion: string;

    @IsString() @IsNotEmpty()
    paquete: string;

    @IsArray()
    toppings: string[];
}
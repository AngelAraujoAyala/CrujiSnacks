import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { PrismaModule } from './prisma/prisma.module';
import { PackagesModule } from './packages/packages.module';
import { ToppingsModule } from './toppings/toppings.module';
import { BloqueosModule } from './bloqueos/bloqueos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReservationsModule,
    PrismaModule,
    PackagesModule,
    ToppingsModule,
    BloqueosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

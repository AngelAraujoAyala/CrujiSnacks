import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { PrismaModule } from './prisma/prisma.module';
import { PackagesModule } from './packages/packages.module';
import { ToppingsModule } from './toppings/toppings.module';


@Module({
  imports: [ReservationsModule, PrismaModule, PackagesModule, ToppingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

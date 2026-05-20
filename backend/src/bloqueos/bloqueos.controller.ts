import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';

import { BloqueosService } from './bloqueos.service';

@Controller('bloqueos')
export class BloqueosController {
  constructor(private readonly bloqueosService: BloqueosService) {}

  @Post()
  create(@Body() body: any) {
    return this.bloqueosService.create(body);
  }

  @Get()
  findAll() {
    return this.bloqueosService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqueosService.remove(+id);
  }
}

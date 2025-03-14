import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() body: { name: string; password: string }) {
    return this.usersService.create(body.name, body.password);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { name: string; password: string }) {
    return this.usersService.update(id, body.name, body.password);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}

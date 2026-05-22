import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 201 Created — успешное создание ресурса, при котором возвращается созданный ресурс
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // 200 OK — успешное выполнение запроса, при котором возвращаются данные.
  @Get()
  @HttpCode(200) //Default можно не писать
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200) //Default можно не писать
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200) //Default можно не писать
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
  // 204 No Content — успешное выполнение запроса, при котором нет данных для возврата
  @Delete(':id')
  @HttpCode(204) //Default 200
  remove(@Param('id') id: string) {
    this.userService.remove(id);
    return;
  }
}

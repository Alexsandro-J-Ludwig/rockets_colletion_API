import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserDTO } from './dtos/User.dto';
import { UserUpdateDTO } from './dtos/User.update.dto';
import { UserService } from './User.service';
import jwt from 'jsonwebtoken';

@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  @HttpCode(201)
  async createUser(@Body() userDTO: UserDTO) {
    const response = await this.userService.create(userDTO);

    const token = jwt.sign({ _id: response._id, usernamee: response.username }, process.env.JWT_SECRET, { expiresIn: 3600 });
    return { success: true, data: { token: token } };
  }

  @Post("/login")
  @HttpCode(200)
  async getUser(@Body() userDTO: UserDTO) {
    const response = await this.userService.login(userDTO);

    const token = jwt.sign({ _id: response._id, usernamee: response.username }, process.env.JWT_SECRET, { expiresIn: 3600 });
    return { success: true, data: { token: token } };
  }

  @Put('/update')
  @HttpCode(200)
  async updateUser(
    @Req() req: Request,
    @Body() userUpdateDTO: UserUpdateDTO,
  ) {
    const id = req["user"]._id;
    const response = await this.userService.update(id, userUpdateDTO);
    return response;
  }

  @Delete('/delete')
  @HttpCode(204)
  async deleteUser(@Req() req: Request) {
    const id = req["user"]._id;
    const response = await this.userService.delete(id);
  }
}

export { UserController };

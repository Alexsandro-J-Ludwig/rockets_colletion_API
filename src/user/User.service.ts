import { UserDTO } from './dtos/User.dto';
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserRepository } from './User.repository';
import { UserUpdateDTO } from './dtos/User.update.dto';
import { UserResponseDTO } from './dtos/User.response.dto';
import { UserAlreadyExistsException } from "./exceptions/User-already-exists.exception"
import { UserNotExistsException } from './exceptions/User-not-exist.exception';
import { UserPasswordIncorrectException } from './exceptions/User-password-incorrect.exception';

@Injectable()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: UserDTO): Promise<UserResponseDTO> {
    const user = await this.checkUser(dto.email);
    if (user) throw new UserAlreadyExistsException();

    const password = await bcrypt.hash(dto.password, 10);

    const userToCreate = {
      _id: crypto.randomUUID(),
      ...dto,
      password: password,
    };

    const data = await this.userRepository.create(userToCreate);
    return new UserResponseDTO(data);
  }

  async login(dto: UserDTO) {
    const data = await this.checkUser(dto.email);
    if(!data) throw new UserNotExistsException();
    
    const checkPassword = await bcrypt.compare(dto.password, data.password);

    if (!checkPassword) throw new UserPasswordIncorrectException();

    return new UserResponseDTO(data);
  }

  async update(id, dto: UserUpdateDTO) {
    const user = await this.checkUser(dto.email);
    if(!user) throw new UserAlreadyExistsException();

    const updateToUser = {
      _id: id,
      ...dto,
    };
    const data = await this.userRepository.update(updateToUser);

    return new UserResponseDTO(data);
  }

  async delete(id) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new UserNotExistsException();

    const data = await this.userRepository.delete(id);

    return data;
  }

  async checkUser(email: string) {
    const data = await this.userRepository.get(email);
    return data;
  }
}

export { UserService };

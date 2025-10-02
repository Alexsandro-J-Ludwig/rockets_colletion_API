import { UserDTO } from './dtos/User.dto';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserRepository } from './User.repository';
import { UserUpdateDTO } from './dtos/User.update.dto';
import { UserResponseDTO } from './dtos/User.response.dto';

@Injectable()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: UserDTO): Promise<UserResponseDTO> {
    const user = await this.checkUser(dto.email);
    if (user) throw new ConflictException("Usuario com esse email ja existe")

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
    if(!data) throw new NotFoundException("Usuario nao encontrado")
    
    const checkPassword = await bcrypt.compare(dto.password, data.password);

    if (!checkPassword) throw new UnauthorizedException("Senha incorreta")

    return new UserResponseDTO(data);
  }

  async update(id, dto: UserUpdateDTO) {
    const user = await this.checkUser(dto.email);
    if(!user) throw new NotFoundException("Usuario nao encontrado")

    const updateToUser = {
      _id: id,
      ...dto,
    };
    const data = await this.userRepository.update(updateToUser);

    return new UserResponseDTO(data);
  }

  async delete(id) {
    const user = await this.userRepository.getById(id);
    if (!user) throw new NotFoundException("Usuario nao encontrado")

    const data = await this.userRepository.delete(id);

    return data;
  }

  async checkUser(email: string) {
    const data = await this.userRepository.get(email);
    return data;
  }
}

export { UserService };

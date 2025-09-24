import { PartialType } from '@nestjs/mapped-types';
import { UserDTO } from './User.dto';

class UserUpdateDTO extends PartialType(UserDTO) {}

export { UserUpdateDTO };

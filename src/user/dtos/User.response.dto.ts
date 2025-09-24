import { IsEmail, IsString, IsUUID } from 'class-validator';

class UserResponseDTO {
  @IsUUID()
  readonly _id: string;

  @IsString()
  readonly username: string;

  constructor(data: any) {
    this._id = data._id;
    this.username = data.username;
  }
}

export { UserResponseDTO };

import { ConflictException } from '@nestjs/common';

export class UserNotExistsException extends ConflictException {
  constructor() {
    super('User not exists.');
  }
}
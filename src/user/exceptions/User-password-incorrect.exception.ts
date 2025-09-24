import { ConflictException } from '@nestjs/common';

export class UserPasswordIncorrectException extends ConflictException {
  constructor() {
    super('User not exists.');
  }
}
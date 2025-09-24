import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './User.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
class UserRepository {
  constructor(@InjectModel(User.name)private readonly userModel: Model<User>) {}

  async create(user: User) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async get(email: string) {
    return await this.userModel.findOne({ email });
  }

  async getById(_id: string){
    return await this.userModel.findOne({_id})
  }

  async update(userToUpdate: Partial<User>) {
    const { _id, ...updatedFilds } = userToUpdate;
    return await this.userModel.findByIdAndUpdate(_id, updatedFilds, { new: true });
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id:id });
  }
}

export { UserRepository };

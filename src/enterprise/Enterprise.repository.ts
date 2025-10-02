import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Enterprise } from './Enterprise.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
class EnterpriseRepository {
  constructor(
    @InjectModel(Enterprise.name)
    private readonly enterpriseModel: Model<Enterprise>,
  ) {}

  async create(enterprise: Enterprise) {
    const createdEnterprise = new this.enterpriseModel(enterprise);
    return await createdEnterprise.save();
  }

  async get(name: string) {
    return await this.enterpriseModel.findOne({ name });
  }

  async getAll(){
    return await this.enterpriseModel.find();
  }

  async update(enterpriseToUpdate: Partial<Enterprise>){
    const { uuid, ...updatedFilds } = enterpriseToUpdate;
    return await this.enterpriseModel.findByIdAndUpdate(uuid, updatedFilds, { new: true });
  }

  async delete(id: string) {
    return await this.enterpriseModel.deleteOne({ uuid:id });
  }
}

export { EnterpriseRepository };
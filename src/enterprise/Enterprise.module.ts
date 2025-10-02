import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Enterprise, EnterpriseSchema } from './Enterprise.model';
import { EnterpriseController } from './Enterprise.controller';
import { EnterpriseService } from './Enterprise.service';
import { EnterpriseRepository } from './Enterprise.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enterprise.name, schema: EnterpriseSchema }]),
  ],
  controllers: [EnterpriseController],
  providers: [EnterpriseService, EnterpriseRepository],
  exports: [EnterpriseService, EnterpriseRepository],
})
export class UserModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enterprise.name, schema: EnterpriseSchema }]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserModule {}
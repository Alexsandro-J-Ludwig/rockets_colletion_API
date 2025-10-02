import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EnterpriseDocument = HydratedDocument<Enterprise>;

@Schema()
export class Enterprise {
  @Prop({ type: String, required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);

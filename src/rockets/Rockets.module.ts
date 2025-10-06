import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Rocket.name, schema: RocketSchema }]),
    ],
    controllers: [],
    providers: [],
    exports: [],
});

export class RocketModule {}
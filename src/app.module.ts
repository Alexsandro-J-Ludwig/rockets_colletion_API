import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user/User.controller';
import { UserModule } from './user/User.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URL,
      }),
    }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/user/create', method: RequestMethod.POST },
        { path: '/user/login', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}


import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No token provided.');

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format.');
    }

    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req['user'] = verify;
      
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}

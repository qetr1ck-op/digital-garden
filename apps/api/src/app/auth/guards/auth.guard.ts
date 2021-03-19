import { AuthService } from './../services/auth.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.authService.getTokenFromAuthHeader(
      request.headers.authorization
    );

    return await this.authService.validateAccessToken(token);
  }
}

export const UseAuthGuard = () => UseGuards(AuthGuard);

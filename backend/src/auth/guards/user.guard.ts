import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (request.isAuthenticated()) {
      const endpointUserId = request.url.split('/')[3];
      return request.user.id === endpointUserId;
    }
    return false;
  }
}
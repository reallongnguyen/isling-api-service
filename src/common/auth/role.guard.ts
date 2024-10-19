import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppError } from 'src/common/models/AppError';
import { Role } from './models/role.enum';
import { ROLES_KEY } from './decorators/require-any-roles.decorator';
import { AuthContextInfo } from './models/auth-context-info.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { authContext } = context.switchToHttp().getRequest();
    const authCtx = authContext as AuthContextInfo;

    if (!authCtx || !Array.isArray(authCtx.roles)) {
      throw new AppError('common.invalidToken');
    }

    if (requiredRoles.find((role) => authCtx.roles.includes(role))) {
      return true;
    }

    throw new AppError('common.noPrivilege', {
      roles: requiredRoles.join(', '),
    });
  }
}

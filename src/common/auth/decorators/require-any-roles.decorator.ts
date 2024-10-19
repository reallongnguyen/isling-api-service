import { SetMetadata } from '@nestjs/common';
import { Role } from '../models/role.enum';

export const ROLES_KEY = 'requireAnyRoles';
export const RequireAnyRoles = (...roles: Role[]) =>
  SetMetadata(ROLES_KEY, roles);

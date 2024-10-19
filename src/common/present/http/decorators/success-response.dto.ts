import { OmitType } from '@nestjs/swagger';

import AppResponse from 'src/common/present/http/HttpResponse';

export default class SuccessResponseDto extends OmitType(AppResponse, [
  'error',
] as const) {}

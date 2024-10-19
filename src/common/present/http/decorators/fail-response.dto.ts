import { ApiProperty, OmitType } from '@nestjs/swagger';

import AppResponse from 'src/common/present/http/HttpResponse';

export default class FailResponseDto extends OmitType(AppResponse, [
  'data',
] as const) {
  @ApiProperty({
    description: 'API request result',
    example: false,
  })
  success: boolean;
}

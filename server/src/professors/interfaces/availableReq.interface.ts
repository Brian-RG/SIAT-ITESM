import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseEventDto } from '../../events/dto/base-event.dto';

export class AvailableReq {
  @ApiProperty()
  @IsNotEmpty()
  periodId: string;

  @ApiProperty()
  @IsNotEmpty()
  events: BaseEventDto[];
}

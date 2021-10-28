import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DirectorDto {
  @ApiProperty()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

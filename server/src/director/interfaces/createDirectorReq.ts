import { ApiProperty } from '@nestjs/swagger';
import { DirectorDto } from '../dto/director.dto';

export class CreateDirectorReq {
  @ApiProperty()
  professors: DirectorDto[];
}

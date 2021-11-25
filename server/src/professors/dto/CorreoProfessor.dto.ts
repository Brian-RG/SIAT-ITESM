import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class CorreoProfessorDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}

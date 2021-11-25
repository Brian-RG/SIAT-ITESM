import { ApiProperty } from '@nestjs/swagger';
import { CorreoProfessorDto } from '../dto/CorreoProfessor.dto';
import { IsNotEmpty} from 'class-validator';

export class CorreoProfessorsReq {
  @ApiProperty()
  professors: CorreoProfessorDto[];

  @ApiProperty()
  @IsNotEmpty()
  periodId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { CreateProfessorDto } from '../dto/create-professor.dto';

export class CreateProfessorsReq {
  @ApiProperty()
  professors: CreateProfessorDto[];
}

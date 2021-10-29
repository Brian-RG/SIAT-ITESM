import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmpty} from 'class-validator';
import { CreateUserDTO } from 'src/users/dto/user-creation.dto';
import { UserDTO } from 'src/users/dto/user.dto';
import { UsersEntity } from 'src/users/entity/users.entity';

export class CreateProfessorDto {
  @ApiProperty()
  @IsNotEmpty()
  nomina: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  area: string[];

  @ApiProperty()
  coordination: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  loadLimit: number;
  
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty()
  user: UsersEntity;
}

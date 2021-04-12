import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * DTO used as a return result of the user that ommits it's password.
 */
export class UserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nomina: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
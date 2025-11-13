import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserRequest {
  @IsString()
  id: string;

  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsBoolean()
  isActive: boolean;
}
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserRequest {
  @IsString()
  key: string;

  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsBoolean()
  isActive: boolean;
}
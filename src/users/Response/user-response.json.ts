import { Exclude, Expose, plainToClass } from "class-transformer";
import { User } from "../entities/user.entity";

@Exclude()
export class UserResponse {
  @Expose()
  key: string;

  @Expose()
  emailAddress: string;

  @Expose()
  userName: string;

  //hide
  isActive: boolean;

  //hide
  organization: string;
}
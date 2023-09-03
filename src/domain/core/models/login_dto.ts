import { IsEmail } from "class-validator";
import { BaseDto } from "../../../core/base_dto";
import { createInstance } from "../../../core/instance_creator";

export interface Login {
  email: string;
  password: string;
}

export class LoginDTO extends BaseDto implements Login {
  @IsEmail()
  email: string;

  password: string;

  static toDTO(signup: Login): LoginDTO {
    return createInstance<LoginDTO>(LoginDTO, signup);
  }
}

import { IsEmail } from "class-validator";
import { createInstance } from "./utils";

export interface Login {
  email: string;
  password: string;
}

export class LoginDTO  implements Login {
  @IsEmail()
  email: string;

  password: string;

  static toDTO(signup: Login): LoginDTO {
    return createInstance<LoginDTO>(LoginDTO, signup);
  }
}

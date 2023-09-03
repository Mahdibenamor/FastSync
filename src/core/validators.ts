import { validate } from "class-validator";
import { BaseDto } from "./base_dto";

export class validators {
  constructor(private dto: BaseDto) {}

  public async validate() {
    let errors = await validate(this.dto);
    let errorMessages = [];
    if (errors.length > 0) {
      errorMessages = errors.map((error) => {
        return Object.values(error.constraints).join(", ");
      });
      console.error(`Validation errors: ${errorMessages.join("; ")}`);
    }
    return errorMessages;
  }
}

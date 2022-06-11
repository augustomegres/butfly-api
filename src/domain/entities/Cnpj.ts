import { AppError } from "@infra/shared/errors/AppError";
import { validateCNPJ } from "validations-br";

export class Cnpj {
  value: string;

  constructor(cnpj: string) {
    this.validate(cnpj);
    this.value = cnpj;
  }

  validate(cnpj: string) {
    if (!validateCNPJ(cnpj)) {
      throw new AppError("Cnpj is invalid.");
    }
  }
}

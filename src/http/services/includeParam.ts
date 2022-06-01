import { AppError } from "@shared/errors/AppError"

export class IncludeParam {
  handle(includeParam?: string, validFields?: string[]): string[] {
    if (!includeParam) return []
    const fields = includeParam.replace(/[()]/gi, "").split(";");
    fields.map((field) => {
      if (!validFields?.includes(field)) throw new AppError("Invalid query param provided, valid fields are: " + validFields?.join(", "))
    })
    return fields
  }
}
import { AppError } from "@shared/errors/AppError"

export class SortParam {
  handle(sortParam?: string, validFields?: string[]): { [field: string]: 'asc' | 'desc' } | undefined {
    if (!sortParam) return
    if (!sortParam?.includes(':')) throw new AppError('Invalid sort param provided')
    const [field, order] = sortParam.split(':')
    if (!validFields?.includes(field)) throw new AppError("Invalid query param provided, valid fields are: " + validFields?.join(", "))
    if (order !== 'asc' && order !== 'desc') throw new AppError('Invalid sort order, must be asc or desc')
    return { [field]: order }
  }
}
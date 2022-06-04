export function searchParamParser(search?: string, validFields?: string[]): { OR?: { [field: string]: { contains: string, mode: 'insensitive' } }[] } {
  if (!search || !validFields) return { OR: undefined }
  const searchParam: { OR: { [field: string]: { contains: string, mode: 'insensitive' } }[] } = { OR: [] }
  validFields.map((field) => searchParam.OR.push({ [field]: { contains: search, mode: 'insensitive' } }))
  return searchParam
}

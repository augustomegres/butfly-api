export function includeParamParser(includes: string[]) {
  if (!includes.length) return null
  const includeObject: { [field: string]: boolean } = {}
  includes.map((include) => includeObject[include] = true)
  return includeObject
}
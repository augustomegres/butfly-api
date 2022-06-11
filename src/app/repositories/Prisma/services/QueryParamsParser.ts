import { PrismaParamOperators, QueryParamOperators } from "@src/@types/QueryParamTypes";

type ParsedParams = {
  [field: string]: {
    gt?: string,
    gte?: string,
    lt?: string,
    lte?: string,
    eq?: string,
    not?: string,
    contains?: string,
  }
}

export function prismaParamParser(params: [string, QueryParamOperators, string][]): ParsedParams {
  const prismaOperators: { [field: string]: PrismaParamOperators } = {
    '>': 'gt',
    '>=': 'gte',
    '<': 'lt',
    '<=': 'lte',
    '=': 'equals',
    '!=': 'not',
    '~': 'contains'
  }

  const fields: ParsedParams = {}
  params.forEach(([field, operator, value]) => {
    const prismaOperator: PrismaParamOperators = prismaOperators[operator]
    fields[field] = { [prismaOperator]: value }
  });
  return fields
}
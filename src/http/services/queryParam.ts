import { AppError } from "@shared/errors/AppError";
import { QueryParamOperators } from "./QueryParamTypes";

export class QueryParams {
  handle(queryString: string): [string, QueryParamOperators, string][] {
    if (!queryString) return [];

    const search: [string, QueryParamOperators, string][] = [];
    const fields = queryString.replace(/[()]/gi, "").split(";");

    fields.map((field) => {
      const matchOperator = field.match(
        /(>=)|(<=)|(!=)|(!~)|(>)|(<)|(~)|(=)/g
      ) as QueryParamOperators[] | null;
      if (!matchOperator) throw new AppError("Operator was not found");
      if (matchOperator.length > 1) throw new AppError("You must provide only one operator");
      const [operator] = matchOperator;
      if (!operator) throw new AppError("Invalid query param");
      const [key, value] = field.split(operator);
      search.push([key, operator, value]);
    });

    return search;
  }
}

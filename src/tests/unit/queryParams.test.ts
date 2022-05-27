import { QueryParams } from "@http/services/queryParam";

const queryParams = new QueryParams();

describe("QueryParams", () => {
  it("should return empty array if no query string is passed", () => {
    const params = queryParams.handle("");
    expect(params).toBeInstanceOf(Array);
    expect(params.length).toBe(0);
  });

  it("should return array of key value pairs", () => {
    const params = queryParams.handle("(key=value)");
    expect(params).toHaveLength(1);
    expect(params[0]).toEqual(["key", "=", "value"]);
  });

  it("should return array of key value of two pairs", () => {
    const params = queryParams.handle("(key1=value1;key2=value2)");
    expect(params).toEqual([
      ["key1", "=", "value1"],
      ["key2", "=", "value2"],
    ]);
  });

  it("should thrown an error if field is invalid", () => {
    expect(() => queryParams.handle("Invalid_query")).toThrow(
      "Operator was not found"
    );
  });

  it("should thrown an error if more than one operator was found", () => {
    expect(() => queryParams.handle("Invalid!=_=query")).toThrow(
      "You must provide only one operator"
    );
    expect(() => queryParams.handle("Invalid==query")).toThrow(
      "You must provide only one operator"
    );
  });
});

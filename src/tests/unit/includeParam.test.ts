import { IncludeParam } from "@infra/http/services/includeParam"

describe("IncludeParam", () => {
  it("should return an empty array if no include param is passed", () => {
    const includeParamParser = new IncludeParam()
    const includeParam = includeParamParser.handle(undefined, ["phones", "emails", "addresses"])
    expect(includeParam).toEqual([])
  })
  it("should return an empty array if an empty include param is passed", () => {
    const includeParamParser = new IncludeParam()
    const includeParam = includeParamParser.handle("", ["phones", "emails", "addresses"])
    expect(includeParam).toEqual([])
  })
  it("should return an empty array if an invalid include param is passed", () => {
    const includeParamParser = new IncludeParam()
    expect(() => includeParamParser.handle("invalid", ["phones", "emails", "addresses"])).toThrowError(
      "Invalid query param provided, valid fields are: phones, emails, addresses"
    )
  })
  it("should return an array of valid include params", () => {
    const includeParamParser = new IncludeParam()

    const includeParamTest1 = includeParamParser.handle("phones;emails", ["phones", "emails", "addresses"])
    expect(includeParamTest1).toEqual(["phones", "emails"])
    const includeParamTest2 = includeParamParser.handle("phones;emails;addresses", ["phones", "emails", "addresses"])
    expect(includeParamTest2).toEqual(["phones", "emails", "addresses"])
  })
})

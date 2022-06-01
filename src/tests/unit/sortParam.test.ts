import { SortParam } from "@http/services/sortParam";
const sortParam = new SortParam()

describe('SortParam', () => {
  it('should return empty array if no query string is passed', () => {
    const sort = sortParam.handle('name:asc', ["name", "surname"])
    expect(sort).toEqual({ name: 'asc' })
  })

  it('should throw an error if invalid field was provided', () => {
    expect(() => sortParam.handle('name>asc', ["name", "surname"])).toThrow('Invalid sort param provided')
    expect(() => sortParam.handle('name.asc', ["name", "surname"])).toThrow('Invalid sort param provided')
    expect(() => sortParam.handle('asc', ["name", "surname"])).toThrow('Invalid sort param provided')
    expect(() => sortParam.handle('name', ["name", "surname"])).toThrow('Invalid sort param provided')
  })

  it('should throw an error if invalid order was provided', () => {
    expect(() => sortParam.handle('name:other', ["name", "surname"])).toThrow('Invalid sort order, must be asc or desc')
  })

  it('should throw an error if provided field was not a valid field', () => {
    expect(() => sortParam.handle('another:asc', ["name", "surname"])).toThrow('Invalid query param provided, valid fields are: name, surname')
  })
})
import {useUrlParam} from "../useUrlParam";

delete global.window.location
global.window.location = { 
  href: 'https://example.com', 
  search: "?someParam=123&anotherParam=hello&thirdParam=abcxyz",
  pathname: "/some/sub/directory" 
}

beforeAll(() => {
  const location = window.location
  delete global.window.location
  global.window.location = Object.assign({}, location)
})

describe('useUrlParam()', () => {
  it('should return value of parameter name given', () => {
    const someParam = useUrlParam('someParam');
    expect(someParam).toEqual('123');
  });

  it("should return null value if parameter name given doesn't exist", () => {
    const someParam = useUrlParam('missingParam');
    expect(someParam).toEqual(null);
  })
})
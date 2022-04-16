import {bool} from "./bool";

describe('bool', function () {
  const parser = bool

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'fail',
    })
  })

  test('"true"を与えたとき、パースに成功して true を返す', () => {
    const input = [...'true']
    const result = parser(input)
    expect(result).toEqual({
      result: 'success',
      data: true,
      rest: [],
    })
  })

  test('"false"を与えたとき、パースに成功して false を返す', () => {
    const input = [...'false']
    const result = parser(input)
    expect(result).toEqual({
      result: 'success',
      data: false,
      rest: [],
    })
  })

  test('"null"を与えたとき、パースに成功して null を返す', () => {
    const input = [...'null']
    const result = parser(input)
    expect(result).toEqual({
      result: 'fail',
    })
  })
});

// test('', () => {
//
// })

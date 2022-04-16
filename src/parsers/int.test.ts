import {int} from "./int";

describe('int', function () {
  const parser = int

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'fail',
    })
  })

  test('"true"を与えたとき、パースに失敗する', () => {
    const input = [...'true'] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'fail',
    })
  })

  test('"0"を与えたとき、パースに成功して 0 を返す', () => {
    const input = [...'0'] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'success',
      data: 0,
      rest: [],
    })
  })

  test('"42"を与えたとき、パースに成功して 42 を返す', () => {
    const input = [...'42'] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'success',
      data: 42,
      rest: [],
    })
  })

  test('"-273"を与えたとき、パースに成功して -273 を返す', () => {
    const input = [...'-273'] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'success',
      data: -273,
      rest: [],
    })
  })

  test('"+3735928559"を与えたとき、パースに成功して +3735928559 を返す', () => {
    const input = [...'+3735928559'] as const
    const result = parser(input)
    expect(result).toEqual({
      result: 'success',
      data: 3735928559,
      rest: [],
    })
  })
});

// test('', () => {
//
// })

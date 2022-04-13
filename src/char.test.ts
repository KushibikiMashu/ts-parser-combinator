import {digit} from "./char";

describe('digit', function () {
  const parser = digit

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })

  test('5 を与えたとき、パースに成功して 5 を返す', () => {
    const input = [...'5']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: '5',
      rest: [],
    })
  })

  test('a を与えたとき、パースに失敗する', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })
});

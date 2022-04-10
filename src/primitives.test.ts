import {anyChar} from './primitives'

describe('anyChar', function () {
  const parser = anyChar

  test('空入力を与えたとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail'
    })
  })

  test('a を与えると、パースに成功して a を返す', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'a',
      rest: []
    })
  })

  test('hoge を与えたとき、パースに成功して h を返す', () => {
    const input = [...'hoge']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'h',
      rest: [...'oge']
    })
  })
});

// test('', () => {
//
// })

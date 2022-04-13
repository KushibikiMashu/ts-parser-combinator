import {alpha, lowerAlpha, map, str, upperAlpha} from "./util";
import {digit} from "./char";

describe('upperAlpha', function () {
  const parser = upperAlpha;

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })

  test('a を与えたとき、パースに失敗する', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })

  test('A を与えたとき、パースに成功して A を返す', () => {
    const input = [...'A']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'A',
      rest: [],
    })
  })
});

describe('lowerAlpha', function () {
  const parser = lowerAlpha

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })

  test('a を与えたとき、パースに成功して a を返す', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'a',
      rest: [],
    })
  })

  test('A を与えたとき、パースに失敗する', () => {
    const input = [...'A']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })
});

describe('alpha', function () {
  const parser = alpha

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })

  test('a を与えたとき、パースに成功して a を返す', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'a',
      rest: [],
    })
  })

  test('A を与えたとき、パースに成功して A を返す', () => {
    const input = [...'A']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'A',
      rest: [],
    })
  })

  test('1 を与えたとき、パースに失敗する', () => {
    const input = [...'1']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })
});

describe('map(digit, s =~> Number.parseInt(s, 10))', function () {
  const parser = map(digit, s => Number.parseInt(s, 10))

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail',
    })
  })

  test('5 を与えたとき、パースに成功して数値 5 を返す', () => {
    const input = [...'5']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 5,
      rest: [],
    })
  })
});

describe('str', function () {
  describe('str("true")', function () {
    const parser = str('true')

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })

    test('true を与えたとき、パースに成功して "true" を返す', () => {
      const input = [...'true']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: 'true',
        rest: [],
      })
    })
  });
});

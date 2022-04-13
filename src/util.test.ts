import {alpha, lowerAlpha, upperAlpha} from "./util";

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
});
import {char} from "./primitives";
import {not, or} from "./combinators";

describe('not', function () {
  describe('not(char("a"))', function () {
    const parser = not(char("a"));

    test('入力が空のとき、パースに成功して null を返す', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: null,
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

    test('A を与えたとき、パースに成功して null を返す', () => {
      const input = [...'A']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: null,
        rest: [...'A'],
      })
    })

    test('hoge を与えたとき、パースに成功して null を返す', () => {
      const input = [...'hoge']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: null,
        rest: [...'hoge'],
      })
    })
  });
});

describe('or', function () {
  describe('or([])', function () {
    const parser = or([])

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })

    test('a を与えたとき、パースに失敗する', () => {
      const input = [...'a'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })
  });

  describe('or([char("a"), char("b")])', function () {
    const parser = or([char("a"), char("b")])

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })

    test('a を与えたとき、パースに成功して a を返す', () => {
      const input = [...'a'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: 'a',
        rest: [],
      })
    })

    test('b を与えたとき、パースに成功して b を返す', () => {
      const input = [...'b'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: 'b',
        rest: [],
      })
    })

    test('A を与えたとき、パースに失敗する', () => {
      const input = [...'A'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })
  });
});

// test('', () => {
//
// })

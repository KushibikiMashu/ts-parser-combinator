import {char} from "./primitives";
import {cat, not, or, rep} from "./combinators";

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

describe('cat', function () {
  describe('cat([])', function () {
    const parser = cat([])

    test('入力が空のとき、パースに成功する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: [],
        rest: [],
      })
    })

    test('a を与えたとき、パースに成功して null を返す', () => {
      const input = [...'a']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: [],
        rest: [...'a'],
      })
    })
  });

  describe('cat([char("a"), char("b")])', function () {
    const parser = cat([char("a"), char("b")])

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

    test('abc を与えたとき、パースに成功して c を返す', () => {
      const input = [...'abc']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'b'],
        rest: [...'c'],
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

describe('rep', function () {
  describe('rep(char("a"))', function () {
    const parser = rep(char("a"))

    test('入力が空のとき、パースに成功する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: [],
        rest: [],
      })
    })

    test('a を与えたとき、パースに成功して ["a"] を返す', () => {
      const input = [...'a'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a'],
        rest: [],
      })
    })

    test('aa を与えたとき、パースに成功して ["a", "a"] を返す', () => {
      const input = [...'aa'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      })
    })

    test('aab を与えたとき、パースに成功して ["a", "a"] を返す', () => {
      const input = [...'aab'] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'a'],
        rest: [...'b'],
      })
    })
  });

  describe('rep(char("a"), 1)', function () {
    const parser = rep(char("a"), 1)

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })

    test('a を与えたとき、パースに成功して ["a"] を返す', () => {
      const input = [...'a']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a'],
        rest: [],
      })
    })

    test('aa を与えたとき、パースに成功して ["a", "a"] を返す', () => {
      const input = [...'aa']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      })
    })

    test('aab を与えたとき、パースに成功して ["a", "a"] を返す', () => {
      const input = [...'aab']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'a'],
        rest: [...'b'],
      })
    })
  });

  describe('rep(char("a"), 1, 2)', function () {
    const parser = rep(char("a"), 1, 2)

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })

    test('a を与えたとき、パースに成功して ["a"] を返す', () => {
      const input = [...'a']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a'],
        rest: [],
      })
    })

    test('aa を与えたとき、パースに成功して ["a", "a"] を返す', () => {
      const input = [...'aa']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'a'],
        rest: [],
      })
    })

    test('aab を与えたとき、パースに成功して ["a", "a"] を返す', () => {
      const input = [...'aab']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['a', 'a'],
        rest: [...'b'],
      })
    })
  });
});

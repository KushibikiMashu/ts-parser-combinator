import {alpha, diff, list, lowerAlpha, map, opt, str, upperAlpha} from "./util";
import {digit} from "./char";
import {char} from "./primitives";

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

describe('opt', function () {
  describe('opt(char("a"))', function () {
    const parser = opt(char('a'))

    test('入力が空のとき、パースに成功して status: "none" を返す', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: {status: 'none'},
        rest: [],
      })
    })

    test('a を与えたとき、パースに成功して Option<"a"> を返す', () => {
      const input = [...'a']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: {status: 'some', value: 'a'},
        rest: [],
      })
    })

    test('aa を与えたとき、パースに成功して Option<"aa"> を返す', () => {
      const input = [...'aa']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: {status: 'some', value: 'a'},
        rest: [...'a'],
      })
    })

    test('b を与えたとき、パースに成功して status: "none" を返す', () => {
      const input = [...'b']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: {status: 'none'},
        rest: [...'b'],
      })
    })
  });
});

describe('diff', function () {
  describe('diff(digit, char("0"))', function () {
    const parser = diff(digit, char('0'))

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

    test('"0" を与えたとき、パースに失敗する', () => {
      const input = [...'0']
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail',
      })
    })

    test('"5" を与えたとき、パースに成功して 5 を返す', () => {
      const input = [...'5']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: '5',
        rest: [],
      })
    })
  });
});

describe('list', function () {
  describe('list(digit, char(","))', function () {
    const parser = list(digit, char(','))

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

    test('"1" を与えたとき、パースに成功して ["1"] を返す', () => {
      const input = [...'1']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['1'],
        rest: [],
      })
    })

    test('"1,2,3,4,5" を与えたとき、パースに成功して ["1","2","3","4","5"] を返す', () => {
      const input = [...'1,2,3,4,5']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: ['1', '2', '3', '4', '5'],
        rest: [],
      })
    })
  });
});

import {char} from "./primitives";
import {not} from "./combinators";

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

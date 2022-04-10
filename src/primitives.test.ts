import {anyChar, char, eof, is} from './primitives'

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

describe('eof', function () {
  const parser = eof

  test('入力が空のとき、パースに成功して null を返す', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: null,
      rest: []
    })
  })

  test('aを入力したとき、パースに失敗する', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail'
    })
  })
});

describe('char', function () {
  const parser = char('a')

  test('入力が空のとき、パースに失敗する', () => {
    const input = [] as const
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail'
    })
  })

  test('a を与えたとき、パースに成功して a を返す', () => {
    const input = [...'a']
    const output = parser(input)
    expect(output).toEqual({
      result: 'success',
      data: 'a',
      rest: []
    })
  })

  test('A を与えたとき、パースに失敗する', () => {
    const input = [...'A']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail'
    })
  })

  test('hoge を与えたとき、パースに失敗する', () => {
    const input = [...'hoge']
    const output = parser(input)
    expect(output).toEqual({
      result: 'fail'
    })
  })
})

describe('is', function () {
  describe('判定対象が a のみ', function () {
    const parser = is((c): c is 'a' => c === 'a')

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail'
      })
    })

    test('a を与えたとき、パースに成功して a を返す', () => {
      const input = [...'a']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: 'a',
        rest: []
      })
    })

    test('A を与えたとき、パースに失敗する', () => {
      const input = [...'A']
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail'
      })
    })
  });

  describe('判定対象が "0" または "1"のとき', function () {
    const parser = is((c): c is '0' | '1' => c === '0' || c === '1')

    test('入力が空のとき、パースに失敗する', () => {
      const input = [] as const
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail'
      })
    })

    test('0 を与えたとき、パースに成功して 0 を返す', () => {
      const input = [...'0']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: '0',
        rest: []
      })
    })

    test('1 を与えたとき、パースに成功して 1 を返す', () => {
      const input = [...'1']
      const output = parser(input)
      expect(output).toEqual({
        result: 'success',
        data: '1',
        rest: []
      })
    })

    test('A を与えたとき、パースに失敗する', () => {
      const input = [...'A']
      const output = parser(input)
      expect(output).toEqual({
        result: 'fail'
      })
    })
  });
});

// test('', () => {
//
// })

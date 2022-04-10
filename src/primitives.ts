import {Parser, ParserInput} from "./types";

export const anyChar: Parser<string> = (input) => {
  if (input.length > 0) {
    const [data, ...rest] = input;
    return {result: 'success', data, rest}
  }

  return {result: 'fail'}
}

export const eof: Parser<null> = (input) => {
  if (input.length === 0) {
    return {result: 'success', data: null, rest: []}
  }

  return {result: 'fail'}
}

type CharFunc = <T extends ParserInput[0]>(c: T) => Parser<T>
export const char: CharFunc = (c) => (input) => {
  const r = anyChar(input);
  if (r.result === 'fail') return r
  if (r.data !== c) return {result: 'fail'}

  return {result: 'success', data: c, rest: r.rest}
}

type IsFunc = <T extends string>(f: (c: ParserInput[0]) => c is T) => Parser<T>
export const is: IsFunc = (f) => (input) => {
  const r = anyChar(input);
  if (r.result === 'fail') return r
  if (!f(r.data)) return {result: 'fail'}

  return {result: 'success', data: r.data, rest: r.rest}
}

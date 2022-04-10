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

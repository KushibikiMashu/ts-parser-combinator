import {Parser, ParserData} from "./types";
import assert from "assert";

type NotFunc = (p: Parser<unknown>) => Parser<null>
export const not: NotFunc = (p) => (input) => {
  const r = p(input)
  if (r.result === 'success') {
    return {result: 'fail'}
  } else {
    return {result: 'success', data: null, rest: input}
  }
}

type OrFunc = <T>(ps: Parser<T>[]) => Parser<T>
export const or: OrFunc = (ps) => (input) => {
  for (const p of ps) {
    const r = p(input)
    if (r.result === 'success') {
      return r
    }
  }

  return {result: 'fail'}
}

type CatFunc = <T extends Parser<unknown>[]>(ps: [...T]) => Parser<{ [K in keyof T]: ParserData<T[K]> }>
export const cat: CatFunc = (ps) => (input) => {
  const rs = []
  let i = input
  for (const p of ps) {
    const r = p(i)
    if (r.result === 'fail') return r
    rs.push(r.data)
    i = r.rest
  }

  return {
    result: 'success',
    data: rs as ParserData<ReturnType<ReturnType<CatFunc>>>,
    rest: i,
  }
}

type RepFunc = <T>(p: Parser<T>, min?: number, max?: number) => Parser<T[]>
export const rep: RepFunc = (p, min = 0, max = Number.POSITIVE_INFINITY) => (input) => {
  assert(min >= 0, 'min must be >= 0')
  assert(max >= 0, 'max must be >= 0')
  assert(max >= min, 'max must be >= min')

  const rs: ParserData<typeof p>[] = []
  let i = input
  for (let n = 0; n < max; n++) {
    const r = p(i)
    if (r.result === 'fail') break
    rs.push(r.data)
    i = r.rest
  }

  if (rs.length < min) return {result: 'fail'}

  return {
    result: 'success',
    data: rs,
    rest: i,
  }
}

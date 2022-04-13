import {Parser} from "./types";
import {char, is} from "./primitives";
import {cat, not, rep} from "./combinators";

export type UpperAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type LowerAlphabet = Lowercase<UpperAlphabet>
export type Alphabet = UpperAlphabet | LowerAlphabet;

export const upperAlpha: Parser<UpperAlphabet> = is((c): c is UpperAlphabet => /^[A-Z]$/.test(c));
export const lowerAlpha: Parser<LowerAlphabet> = is((c): c is LowerAlphabet => /^[a-z]$/.test(c));
export const alpha: Parser<Alphabet> = is((c): c is Alphabet => /^[A-Za-z]$/.test(c));

type MapFunc = <T, U>(p: Parser<T>, f: (a: T) => U) => Parser<U>;
export const map: MapFunc = (p, f) => input => {
  const r = p(input)
  if (r.result === 'fail') return r

  return {
    result: 'success',
    data: f(r.data),
    rest: r.rest,
  }
}

type StrFunc = <T extends string>(s: T) => Parser<T>
export const str: StrFunc = (s) => (input) => {
  const p = cat([...s].map(char))
  const r = p(input)
  if (r.result === 'fail') return r

  return {
    result: 'success',
    data: s,
    rest: r.rest,
  }
}

interface Some<T> {
  status: 'some';
  value: T;
}
interface None {
  status: 'none';
}
export type Option<T> = Some<T> | None;

type OptFunc = <T>(p: Parser<T>) => Parser<Option<T>>;
export const opt: OptFunc = (p) => (input) => {
  const r = rep(p, 0, 1)(input)
  if (r.result === 'fail') return r
  return {
    result: 'success',
    data: r.data.length === 0 ? {status: 'none'} : {status: 'some', value: r.data[0]},
    rest: r.rest,
  }
}

type DiffFunc = <T, U>(p: Parser<T>, q: Parser<U>) => Parser<T>;
export const diff: DiffFunc = (p, q) => map(cat([not(q), p]), ([, r]) => r)

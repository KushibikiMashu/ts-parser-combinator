import {Parser} from "./types";

type NotFunc = (p: Parser<unknown>) => Parser<null>
export const not: NotFunc = (p) => (input) => {
  const r = p(input)
  if (r.result === 'success') {
    return {result: 'fail'}
  } else {
    return {result: 'success', data: null, rest: input}
  }
}

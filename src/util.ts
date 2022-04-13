import {Parser} from "./types";
import {is} from "./primitives";

export type UpperAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';
export type LowerAlphabet = Lowercase<UpperAlphabet>
export type Alphabet = UpperAlphabet | LowerAlphabet;

export const upperAlpha: Parser<UpperAlphabet> = is((c): c is UpperAlphabet => /^[A-Z]$/.test(c));
export const lowerAlpha: Parser<LowerAlphabet> = is((c): c is LowerAlphabet => /^[a-z]$/.test(c));
export const alpha: Parser<Alphabet> = is((c): c is Alphabet => /^[A-Za-z]$/.test(c));
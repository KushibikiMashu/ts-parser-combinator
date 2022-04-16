import {Parser} from "./types";
import {is} from "./primitives";

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export const digit: Parser<Digit> = is((c): c is Digit => /^\d/.test(c))

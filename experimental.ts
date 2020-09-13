// internal helper types
type IncrementLength<A extends Array<any>> = ((x: any, ...xs: A) => void) extends ((...a: infer X) => void) ? X : never;
type EnumerateRecursive<A extends Array<any>, N extends number> = A['length'] extends infer X ? (X | { 0: never, 1: EnumerateRecursive<IncrementLength<A>, N> }[X extends N ? 0 : 1]) : never;

// actual utility types
export type Enumerate<N extends number> = Exclude<EnumerateRecursive<[], N>, N>;
export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;

// usage examples:
type E1 = Enumerate<3>; // hover E1: type E1 = 0 | 1 | 2
type E2 = Enumerate<10>;  // hover E2: type E2 = 0 | 1 | 3 | 2 | 4 | 5 | 6 | 7 | 8 | 9

type R1 = Range<0, 5>; // hover R1: type R1 = 0 | 1 | 3 | 2 | 4
type R2 = Range<5, 11>; // hover R2: type R2 = 10 | 5 | 6 | 7 | 8 | 9


//just wow
let options = ["abc", "def", "hig"];

//mistake but interesting
type arrOptions = [keyof typeof options]

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

let atesta: GetElementType<typeof options>

//----------------------------------------------------------------------------

const values = ['A', 'B', "c", "d"] as const;
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

type Foo = ElementType<typeof values> // this is correctly inferred as literal "A" | "B"

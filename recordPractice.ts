let options = ["abc", "def", "hig"];

//mistake but interesting
type arrOptions = [keyof typeof options]

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

let atesta: GetElementType<typeof options>

//----------------------------------------------------------------------------

//notice that values is much more vague than before with "as const", it only infers values to be a string array.
const values = ['A', 'B', "c", "d"];;
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

type Foo = ElementType<typeof values> // this is correctly inferred as literal "A" | "B"

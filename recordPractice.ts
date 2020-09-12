let options = ["abc", "def", "hig"];

//mistake but interesting
type arrOptions = [keyof typeof options]

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

let atesta: GetElementType<typeof options>

//----------------------------------------------------------------------------
//https://mariusschulz.com/articles/const-assertions-in-literal-expressions-in-typescript
const values = ['A', 'B', "c", "d"] as const;
//notice this works with \/ any too
type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

type Foo = ElementType<typeof values> // this is correctly inferred as literal "A" | "B"

type EleTypeRemake<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ele> ? ele : never;
type myFoo = EleTypeRemake<typeof values>

type FlattenIfArray<T> = T extends (infer R)[] ? R : T


//https://dev.to/miracleblue/how-2-typescript-serious-business-with-typescripts-infer-keyword-40i5

type GetReturnType<original extends Function> =
  original extends (...x: any[]) => infer returnType ? returnType : never

type remakeGetReturnType<original extends Function> = original extends (...args: any[]) => infer whatType ? whatType : never;

type doItAgain<func extends Function> = func extends (...args: any[]) => infer returnedType ? returnedType : never;

function add(num: number) {
  return num * 2;
}

function stringFunc(num: number) {
  return "abc".repeat(num);
}

console.log(stringFunc(5));

type inferedTest = GetReturnType<typeof add>
type inferStringFunc = GetReturnType<typeof stringFunc>;

function eitherTorTArr<T>(input: T, arr: boolean) {
  if (arr === true) {
    return [input];
  }
  return input;
}

//hmm why is this unknown, I was expecting it to be the same inference that eitherTorTArr has. T | T[] 
type inferEitherOfTArr = GetReturnType<typeof eitherTorTArr>

// ah I think this answers it, it's how it works... from the docs
//https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypet
//ReturnType<Type>
type T2 = ReturnType<<T>() => T>;
//    ^ = type T2 = unknown
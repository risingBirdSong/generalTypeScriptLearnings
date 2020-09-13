
type FlattenIfArray<T> = T extends (infer R)[] ? R : T

type GetReturnType<original extends Function> =
  original extends (...x: any[]) => infer returnType ? returnType : never

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
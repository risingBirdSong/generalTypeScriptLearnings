
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

function addPerson(personName: string) {
  return {
    type: "AddPerson",
    payload: personName,
  } as const;
}

function removePerson(id: number) {
  return {
    type: "RemovePerson",
    payload: id,
  } as const;
}

type addOrRemove = ReturnType<typeof addPerson | typeof removePerson>

//oh that is cool;


function wait (time : number){
  setTimeout(() => {
    return;
  }, time);
}

async function addPersonAsync(
  personName: string
) {
  await wait(200);
  return {
    type: "AddPerson",
    payload: personName,
  } as const;
}

async function removePersonAsync(id: number) {
  await wait(200);
  return {
    type: "RemovePerson",
    payload: id,
  } as const;
}

type delayedAddOrRemove = ReturnType<typeof addPersonAsync | typeof removePersonAsync>


 //but to get the returned values fromt he wrapped promise?

 type customReturnType<
  T extends (...args: any) => any
> = T extends (...args: any) => infer R
  ? R
  : any;

  type ReturnTypeJustAsync<
  T extends (...args: any) => any
> = T extends (...args: any) => Promise<infer R>
  ? R
  : any;

  type valuesFromPromise = ReturnTypeJustAsync<typeof addPersonAsync | typeof removePersonAsync>

  //oh that is so cool

  // ahh neat this is exactly what I wanted to do next!

  type ReturnTypeAsyncOrSync<
  T extends (...args: any) => any
> = T extends (...args: any) => Promise<infer R>
  ? R
  : T extends (...args: any) => infer R
  ? R
  : any;

  type asyncTest = ReturnTypeAsyncOrSync<typeof addPersonAsync | typeof removePersonAsync>;
  type syncTest = ReturnTypeAsyncOrSync<typeof addPerson | typeof removePerson>;
  type bothTest = ReturnTypeAsyncOrSync<typeof addPersonAsync | typeof removePerson>
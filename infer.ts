
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


 //  https://mariusschulz.com/articles/conditional-types-in-typescript
  // great resource
  type User = {
    name: string;
    email: string | null;
    id : number;
  };

  type nonNullableProps <T> = {
    [P in keyof T] : null extends T[P] ? never : T[P];
  }[keyof T]

  type test = nonNullableProps<User>


  //Pick example
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }
  
  type TodoPreview = Pick<Todo, "title" | "completed">;
  
  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };

  // custom pick

  interface pickTestAnimal {
    paws : number,
    name : string,
    domesticated : boolean,
  }


    //attempts
  type customPick_A<T, U extends keyof T> = {
    [P in keyof T] : P extends U ? T[P] : never;
  }
  //notice the differences between running index acces with keyof T
  type customPick_B<T, U extends keyof T> = {
    [P in keyof T] : P extends U ? T[P] : never;
  }[keyof T]

  type pickFromAnimalA = customPick_A<pickTestAnimal, "domesticated">
  type pickFromAnimalB = customPick_B<pickTestAnimal, "domesticated">

    //proper implementation of pick
  type properPick <T, U extends keyof T> = {
    [P in U] : T[P]
  }

  type properlyPicked = properPick<pickTestAnimal, "domesticated" | "name">

  // ah thats so cool 

  type pickAgain <T, U extends keyof T> = {
    [P in U] : T[P]
  } 

  type pickedAgain = pickAgain<pickTestAnimal, "name" | "paws">

  type First<T> =
  T extends [infer U, ...unknown[]]
    ? U
    : never;

type SomeTupleType = [string, number, boolean];
type FirstElementType = First<SomeTupleType>; // string


type redoFirst <T> = T extends [infer U , ...unknown[]] ? U : never;

type redoFirstTest = redoFirst<[ ()=>number, boolean, string]>

//neat :) 

type myExtracter <T, U> = T extends U ? T : never;
type Extracted = myExtracter<number | boolean, string | number | boolean>;

type A = Extract<string | string[], any[]>;      // string[]
type B = Extract<(() => void) | null, Function>; // () => void
type C = Extract<200 | 400, 200 | 201>;          // 200
type D = Extract<number, boolean>;   

type myA = myExtracter<string | string[], any[]>;      // string[]
type myB = myExtracter<(() => void) | null, Function>; // () => void
type myC = myExtracter<200 | 400, 200 | 201>;          // 200
type myD = myExtracter<number, boolean>;   

type myExcluder <T, U> = T extends U ? never : T;

type excludedTest = myExcluder<string | number, string>;
type excludedTestA = myExcluder<string[]| string, any[]>;
type excludedTestB = myExcluder<any[]| string, string[]>;

type getParameters <T extends (...args : any[]) => any> = T extends (...args : infer P) => any ? P : never;
type getParametersWithoutFirstExtends <T> = T extends (...args : infer P) => any ? P : never;

function testFuncB (a : number, b : string, c : boolean[]){
  return "im just a test"
}

// ah yes you constrain the input to be of a any function to dissalow inputs like this which would just result in type never 
type gotParams = getParametersWithoutFirstExtends<"hello">

type myGetClassParams <T extends new (...args : any[]) => any> = T extends new (...args : infer P) => any ? P : never;

type classATest = myGetClassParams<ErrorConstructor>;
// [(string | undefined)?]

type classBTest = myGetClassParams<FunctionConstructor>;
// string[]

type classCTest = myGetClassParams<RegExpConstructor>;
// [string, (string | undefined)?]

type myInstanceInferer <T extends new (...args : any[]) => any> = T extends new (...args : any[]) => infer P ? P : never;

type instanceA = myInstanceInferer<ErrorConstructor>;    // Error
type instanceB = myInstanceInferer<FunctionConstructor>; // Function
type instanceC = myInstanceInferer<RegExpConstructor>;   // RegExp

// unpacking type example from ahejlsberg PR

type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type T0 = Unpacked<string>;  // string
type T1 = Unpacked<string[]>;  // string
type Tt2 = Unpacked<() => string>;  // string
type T3 = Unpacked<Promise<string>>;  // string
type T4 = Unpacked<Promise<string>[]>;  // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>>;  // string

type FooType<T> = T extends { a: infer U, b: infer U } ? U : never;
type T10 = FooType<{ a: string, b: string }>;  // string
type T11 = FooType<{ a: string, b: number }>;  // string | number


type remakeUnpacked<T> = T extends (infer U) [] ? U : 
  T extends (...args : any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T;
type myT0 = remakeUnpacked<number>;
type myT1 = remakeUnpacked<number[]>;
type myT2 = remakeUnpacked<() => {tada : string}>;
type myT3 = remakeUnpacked<Promise<string>>;
type myT4 = remakeUnpacked<Promise<string[]>>;
type myT5 =remakeUnpacked<remakeUnpacked<remakeUnpacked<string>>>;

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}

type T40 = FunctionPropertyNames<Part>; // "updatePart"
type T41 = NonFunctionPropertyNames<Part>; // "id" | "name" | "subparts"
type T42 = FunctionProperties<Part>; // { updatePart(newName: string): void }
type T43 = NonFunctionProperties<Part>; // { id: number, name: string, subparts: Part[] }


interface readonlyOptional {
  readonly num? : number;
  readonly str? : string;
}
interface mutableRequired {
  num : number;
  str : string;
}

type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] }; // Remove readonly and ?
type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] }; // Add readonly and ?

type convertA = MutableRequired<readonlyOptional>;
type convertB = ReadonlyPartial<mutableRequired>;

type abc = { a: string };
type bcd = { b: number };

type T1a = keyof (abc & bcd); // "a" | "b"

const T1aTest : T1a = "a";

type mergeA = {a : string} & {b : number} & {c : boolean};


let mergaAtest : mergeA = {
  a : "aaa",
  b : 21,
  c : true
}

type pickTwo = Pick<mergeA, "a" | "c">

let pickTwoObj : pickTwo = {
  a : "aaa",
  c : false
}

type T2a<T> = keyof T; // keyof T | "b"
type mergeB = {d : string} & {e : number};
type keysOf = T2a<mergeA & mergeB>


const c = "c";
const d = 10;
const e = Symbol();

const enum E1 {
  A,
  B,
  C,
}
const enum E2 {
  A = "A",
  B = "B",
  C = "C",
}

type Foo2 = {
  a: string; // String-like name
  5: string; // Number-like name
  c: string; // String-like name
  [d]: string; // Number-like name
  [e]: string; // Symbol-like name
  [E1.A]: string; // Number-like name
  [E2.A]: string; // String-like name
};

type Arrayish<T> = {
  length: number;
  [x: number]: T;
};

 let map: Arrayish<string> = [];
 map.length = 10;
  // map[4] = 4; Type '4' is not assignable to type 'string'.ts(2322)
  map[5] = "no errors"
  
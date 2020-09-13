

type nonRecurseReadOnly<T> = { readonly [P in keyof T]: T[P] };

type Shape = {
  color: string;
  configuration: {
    height: number;
    width: number;
  }
};

const canBeModifiedDeeply: nonRecurseReadOnly<Shape> = {
  color: 'green',
  configuration: {
    //without recrusive read only we could modify these props
    height: 100,
    width: 100,
  }
};

//this could sure be improved!
canBeModifiedDeeply.configuration.height = 122;

//recursive type to make read only!
//https://dev.to/busypeoples/notes-on-typescript-recursive-types-and-immutability-5ck1
type MakeReadOnly<Type> = {
  readonly [Key in keyof Type]: MakeReadOnly<Type[Key]>;
};

const shape: MakeReadOnly<Shape> = {
  color: 'green',
  configuration: {
    //without recrusive read only we could modify these props
    height: 100,
    width: 100,
  }
};

//how to fix this ciruclar reference with proper recursive type
//Type alias 'Nested' circularly references itself.ts(2456)
// type Nested<T> = T[] | Nested<T[]>;
// function flatten<T>(list: Nested<T>): T[] {
//   return (<T>[]).concat(...list.map<T | T[]>((i: T | Nested<T>) =>
//     Array.isArray(i) ? flatten(i) : i));
// }

type ValueOrArray<T> = T | ValueOrArray<T>[];
type NestedStringArray = ValueOrArray<string>;

const nestedStringArray: NestedStringArray = [
  'hello',
  ['w', ['o', 'r', 'l'], 'd'],
];

//recursive JSON

type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }


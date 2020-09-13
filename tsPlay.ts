import { tsNeverKeyword } from "@babel/types";

interface villagerI {
  name: string;
  age: number;
  civilian: true;
}

interface soldierI {
  name: string;
  age: number;
  civilian: false;
}

const villager: villagerI = {
  name: "frank",
  age: 24,
  civilian: true
} as const;

const brokenDeterminer = (input: (soldierI | villagerI)) => {
  if (input.civilian === true) {
    return input;
  }
  return input;
}
//why doesnt this infer villagerTest to be of type villagerI
let vague = brokenDeterminer(villager)


//thanks to Gerrito, we need the infer keyword here to be able to properly infer the type

const determiner = <T extends soldierI | villagerI>(input: T) => {
  if (input.civilian === true) {
    return input;
  }
  return input;
}

let specific = determiner(villager)

function pluck<T extends object, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

const taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
} as const;

// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);

// If we try to pluck model and year, we get an
// array of a union type: (string | number)[]
let modelYear = pluck(taxi, ["model", "year"]);

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}

let gotAge = getProperty(villager, "age");
let gotName = getProperty(villager, "name");
let gotCivilianStatus = getProperty(villager, "civilian");

const remakeGetProperty = <T, K extends keyof T>(o: T, prop: K) => {
  return o[prop];
}
let getAgeAgain = remakeGetProperty(villager, "age");


interface simplePersonI {
  name: string;
}
// was wondering how to do this earlier, had wrongly tried -> T extends object;
// function extendsObject<T extends Object>(input: T): simplePersonI {
//   // how to allow this? SO we know T is an Object but we know nothing else about it? unkown perhaps?
//   if (typeof input["name"] === "string") {

//     return input;
//   }
// }

// function unknownToObj(input: unknown) {
//   if (input instanceof Object) {
//     if (typeof input["name"] === "string") {

//     }
//   }
// }

class Collection<T extends { name: string }> {
  protected items: T[] = [];
  constructor(items: T[]) {
    this.items.push(...items);
  }
  add(items: T) {
    this.items.push(items);
  }
  remove(index: number) {
    this.items.splice(index, 1);
  }
  getItem(index: number): T {
    return this.items[index];
  }
}

let myCollection = new Collection([{ name: "a", extra: "allowed" }])

class SearchableCollection<T extends { name: string }> extends Collection<T> {
  find(name: string): T | undefined {
    return this.items.find(item => item.name === name);
  }
}

let mySearchableCollection = new SearchableCollection([{ name: "frederick", age: 34 }, { name: "claris", age: 87 }])
console.log(mySearchableCollection.find("frederick"))

type myPartial<T> = {
  [P in keyof T]?: T[P];
};

type makeReadOnly<T> = {
  readonly [k in keyof T]: T[k];
}

let allRequired = {
  hammer: "on",
  fretBoard: "standard"
}

type makeOptional = myPartial<typeof allRequired>


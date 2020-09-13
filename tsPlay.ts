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
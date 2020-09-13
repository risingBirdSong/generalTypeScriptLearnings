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
import { Equal, Expect } from "../../common/type-utils";

const getValue = <TObj, X extends keyof TObj>(obj: TObj, key: X) => {
  return obj[key];
};

const obj = {
  a: 1,
  b: "some-string",
  c: true,
};

const numberResult = getValue(obj, "a");
const stringResult = getValue(obj, "b");
const booleanResult = getValue(obj, "c");

type tests = [
  Expect<Equal<typeof numberResult, number>>,
  Expect<Equal<typeof stringResult, string>>,
  Expect<Equal<typeof booleanResult, boolean>>
];

export {};

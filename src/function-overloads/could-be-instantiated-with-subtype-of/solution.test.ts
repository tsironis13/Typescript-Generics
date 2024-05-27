import { Equal, Expect } from "../../common/type-utils";

const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjKey = keyof typeof obj;

type SubType = ObjKey & { readonly __type: unique symbol };

function getObjValue<TKey extends ObjKey>(key: TKey): (typeof obj)[TKey];
function getObjValue(key?: SubType): (typeof obj)["c"];

function getObjValue<TKey extends ObjKey>(key: TKey) {
  return obj[key];
}

const one = getObjValue("a");
const threeByDefault = getObjValue();
const two = getObjValue("b");
const three = getObjValue("c");

type tests = [
  Expect<Equal<typeof one, 1>>,
  Expect<Equal<typeof threeByDefault, 3>>,
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof three, 3>>
];

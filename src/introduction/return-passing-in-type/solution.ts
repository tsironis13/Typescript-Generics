import { Equal, Expect } from "../../common/type-utils";

const returnPassingInType = <T>(t: T) => {
  return t;
};

type MyCustomType = {
  id: number;
  name: string;
};

const two = returnPassingInType(2);
const truthy = returnPassingInType(true);

const x: MyCustomType = {
  id: 1,
  name: "Giannis",
};
const customType = returnPassingInType(x);

type tests = [
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof truthy, true>>,
  Expect<Equal<typeof customType, MyCustomType>>
];

import { Equal, Expect } from "../../common/type-utils";

//these are all types that can produce literals
type Narrowable = string | number | boolean | symbol | undefined | void | null;

//string, number type can produce literals
//by extending string or number typescript preservs the literal type !!!VERY IMPORTANT
export const inferItemLiteral = <N extends Narrowable>(t: N) => {
  return {
    output: t,
  };
};

const result1 = inferItemLiteral("a");
const result2 = inferItemLiteral(123);

type tests = [
  Expect<Equal<typeof result1, { output: "a" }>>,
  Expect<Equal<typeof result2, { output: 123 }>>
];

// @ts-expect-error
const error1 = inferItemLiteral({
  a: 1,
});

type test2 = [Expect<Equal<typeof error1, { output: { a: 1 } }>>];

// @ts-expect-error
const error2 = inferItemLiteral([1, 2]);

type test3 = [Expect<Equal<typeof error2, { output: [1, 2] }>>];

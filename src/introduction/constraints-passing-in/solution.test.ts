import { expectTypeOf, it } from "vitest";
import { Equal, Expect } from "../../common/type-utils";

export const returnWhatPassingIn = <T extends string>(param: T) => param;

it("Should ONLY allow strings passing in", () => {
  const a = returnWhatPassingIn("Giannis");

  type t1 = Expect<Equal<typeof a, "Giannis">>;

  returnWhatPassingIn(1);

  returnWhatPassingIn(true);

  returnWhatPassingIn({
    foo: "bar",
  });
});

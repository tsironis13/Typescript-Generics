import { it } from "vitest";
import { Equal, Expect } from "../../common/type-utils";

export const returnWhatPassingIn = <T>(param: T) => param;

it("Should ONLY allow strings passing in", () => {
  const a = returnWhatPassingIn("Giannis");

  type t1 = Expect<Equal<typeof a, "Giannis">>;

  // @ts-expect-error
  returnWhatPassingIn(1);

  // @ts-expect-error
  returnWhatPassingIn(true);

  // @ts-expect-error
  returnWhatPassingIn({
    foo: "bar",
  });
});

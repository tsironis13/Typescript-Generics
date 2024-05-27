import { Equal, Expect } from "../../common/type-utils";

const makeStatus = <TStatuses extends string | Array<string | TStatuses>>(
  statuses: TStatuses
) => {
  return statuses;
};

const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>
];

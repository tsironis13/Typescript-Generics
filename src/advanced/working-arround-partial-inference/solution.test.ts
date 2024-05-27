import { Equal, Expect } from "../../common/type-utils";

interface Source {
  firstName: string;
  middleName: string;
  lastName: string;
}

export const makeSelectors = <TSource>() => {
  return <TSelectors extends Record<string, (source: TSource) => any>>(
    selectors: TSelectors
  ) => selectors;
};

// export const makeSelectors<Source>()({
//     getFullName: (source) =>
//         `${source.firstName} ${source.middleName} ${source.lastName}`,
//     getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
//     getFirstNameLength: (source) => source.firstName.length
// });

/**
 * We've got a problem here. We want to be able to infer the type
 * of the selectors object from what we passed in to makeSelectors.
 *
 * But we can't. As soon as we pass ONE type argument, inference
 * doesn't work on the other type arguments. We want to refactor this
 * so that we can infer the type of the selectors object.
 *
 * Desired API:
 *
 * makeSelectors<Source>()({ ...selectorsGoHere })
 */
const selectors = makeSelectors<Source>()({
  getFullName: (source) =>
    `${source.firstName} ${source.middleName} ${source.lastName}`,
  getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
  getFirstNameLength: (source) => source.firstName.length,
});

type tests = [
  Expect<Equal<(typeof selectors)["getFullName"], (source: Source) => string>>,
  Expect<
    Equal<(typeof selectors)["getFirstAndLastName"], (source: Source) => string>
  >,
  Expect<
    Equal<(typeof selectors)["getFirstNameLength"], (source: Source) => number>
  >
];
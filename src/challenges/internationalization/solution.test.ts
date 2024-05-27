import { expect, it } from "vitest";

type GetParamKeys<TTranslation extends string> = TTranslation extends ""
  ? []
  : TTranslation extends `${string}{${infer Param}}${infer Tail}`
  ? [Param, ...GetParamKeys<Tail>]
  : [];

["count", "t"];

const translate = <
  T extends Record<string, string>,
  TKey extends keyof T,
  TParamKeys extends string[] = GetParamKeys<T[TKey]>
>(
  translations: T,
  key: TKey,
  ...args: TParamKeys extends []
    ? []
    : [params: Record<TParamKeys[number], string>]
) => {
  const translation = translations[key];
  const params: any = args[0] || {};

  return translation.replace(/{(\w+)}/g, (_, key) => params[key]);
};

// TESTS

const translations = {
  title: "Hello, {name}!",
  subtitle: "You have {count} unread {t} messages.",
  button: "Click me!",
} as const;

it("Should translate a translation without parameters", () => {
  const buttonText = translate(translations, "button");

  expect(buttonText).toEqual("Click me!");
});

it("Should translate a translation WITH parameters", () => {
  const subtitle = translate(translations, "subtitle", {
    count: "2",
    t1: "12",
  });

  expect(subtitle).toEqual("You have 2 unread messages.");
});

it("Should force you to provide parameters if required", () => {
  // @ts-expect-error
  translate(translations, "title");
});

it("Should not let you pass parameters if NOT required", () => {
  // @ts-expect-error
  translate(translations, "button", {});
});

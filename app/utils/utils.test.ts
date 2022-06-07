import { DocumentTypeEnum } from "../models/type";

import { showType, showDate, getTypeFromNewDocument } from "./";

describe("showType", () => {
  test("Returns correct capitalized string", () => {
    expect(showType(DocumentTypeEnum.ADVANCED)).toBe("Advanced");
  });

  test("If incorrect string, return the same without modification", () => {
    expect(showType(null as any)).toBe(null);
    expect(showType(undefined as any)).toBe(undefined);
  });
});

describe("showDate", () => {
  test("Returns correct date", () => {
    const date = new Date("May 06 2020 11:43:05").toJSON();
    expect(showDate(date)).toBe("2020-05-06");
  });
});

describe("getTypeFromNewDocument", () => {
  test("Returns advanced if text and image", () => {
    expect(getTypeFromNewDocument("with text", "with image")).toBe(
      DocumentTypeEnum.ADVANCED
    );
  });

  test("Returns advanced if image but text is empty", () => {
    expect(getTypeFromNewDocument(undefined, "with image")).toBe(
      DocumentTypeEnum.ADVANCED
    );
  });

  test("Returns custom if text, but image is empty", () => {
    expect(getTypeFromNewDocument("with text", undefined)).toBe(
      DocumentTypeEnum.CUSTOM
    );
  });

  test("Returns simple if text and image are empty", () => {
    expect(getTypeFromNewDocument(undefined, undefined)).toBe(
      DocumentTypeEnum.SIMPLE
    );
  });
});

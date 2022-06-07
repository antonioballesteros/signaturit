import { getRangePages } from "./Paginator";

describe("getRangePages", () => {
  test("should return first and last equal 1 when no results", () => {
    const [firstPage, lastPage] = getRangePages(0, 10, 1);
    expect(firstPage).toBe(0);
    expect(lastPage).toBe(0);
  });

  test("should return first and last equal 1 when only one page", () => {
    const [firstPage, lastPage] = getRangePages(1, 10, 1);
    expect(firstPage).toBe(1);
    expect(lastPage).toBe(1);
  });

  test("should return first equal actual when is exact number of items on the page", () => {
    const [firstPage, lastPage] = getRangePages(10, 10, 1);
    expect(firstPage).toBe(1);
    expect(lastPage).toBe(1);
  });

  test("should return first equal actual when is 1", () => {
    const [firstPage, lastPage] = getRangePages(100, 10, 1);
    expect(firstPage).toBe(1);
    expect(lastPage).toBe(4);
  });
});

import { person } from "../src/main";

describe("Hello world", () => {
  test("one string", () => {
    let oneString = person();
    expect(oneString).toBe("hello world");
  });
});

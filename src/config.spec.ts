import * as dotenv from "dotenv";
import { MONGO_URI } from "./config";

jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("config.ts", () => {
  it("should call dotenv.config()", () => {
    expect(dotenv.config).toHaveBeenCalled();
  });

  it("should set MONGO_URI from process.env", () => {
    const expectedMongoUri = process.env.MONGO_URI;
    expect(MONGO_URI).toBe(expectedMongoUri);
  });
});

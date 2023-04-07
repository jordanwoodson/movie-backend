import { MongooseModule } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { MONGO_URI } from "./config";
import { DatabaseModule } from "./database.module";

jest.mock("@nestjs/mongoose", () => ({
  MongooseModule: {
    forRoot: jest.fn().mockImplementation(() => ({})),
  },
}));

describe("DatabaseModule", () => {
  let databaseModule: DatabaseModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    databaseModule = moduleRef.get<DatabaseModule>(DatabaseModule);
  });

  it("should be defined", () => {
    expect(databaseModule).toBeDefined();
  });

  it("should call MongooseModule.forRoot with MONGO_URI", () => {
    expect(MongooseModule.forRoot).toHaveBeenCalledWith(MONGO_URI);
  });
});

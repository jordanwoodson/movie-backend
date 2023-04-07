import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

jest.mock("@nestjs/core", () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe("main.ts", () => {
  let app: Partial<INestApplication>;
  let originalCreate: any;

  beforeEach(() => {
    app = {
      enableCors: jest.fn(),
      listen: jest.fn().mockResolvedValue(undefined),
      init: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
      getHttpServer: jest.fn(),
    };

    originalCreate = NestFactory.create;
    (NestFactory.create as jest.Mock).mockReturnValue(app);
  });

  afterEach(() => {
    (NestFactory.create as jest.Mock) = originalCreate;
  });

  it("should call bootstrap and start the application", async () => {
    const mainModule = require("./main");
    await mainModule.bootstrap(); // Add this line
    expect(NestFactory.create).toHaveBeenCalledWith(
      AppModule,
      expect.any(ExpressAdapter)
    );
    expect(app.enableCors).toHaveBeenCalled();
    expect(app.listen).toHaveBeenCalledWith(3001);
  });
});

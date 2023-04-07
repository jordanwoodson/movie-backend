// src/app.module.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MovieModule } from "./movies/movie.module";
// import { TorrentController } from "./torrent/torrent.controller";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://localhost/nest"
    ),
    MovieModule,
  ],
  // controllers: [TorrentController],
})
export class AppModule {}

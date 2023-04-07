// import { Controller, Get, Param, Res } from "@nestjs/common";
// import { Response } from "express";
// import * as yts from "yts";

// @Controller("download-torrent")
// export class TorrentController {
//   @Get("/:title/:author")
//   async downloadTorrent(
//     @Param("title") title: string,
//     @Param("author") author: string,
//     @Res() res: Response
//   ) {
//     try {
//       const searchResults = await yts.searchMovies({
//         query_term: `${title} ${author}`,
//       });
//       if (searchResults.movies && searchResults.movies.length > 0) {
//         const movie = searchResults.movies[0];
//         const torrent = movie.torrents[0];

//         res.setHeader("Content-Type", "application/x-bittorrent");
//         res.setHeader(
//           "Content-Disposition",
//           `attachment; filename=${movie.title}.torrent`
//         );
//         res.send(Buffer.from(torrent.url, "utf-8"));
//       } else {
//         res.status(404).send("Torrent not found");
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal server error");
//     }
//   }
// }

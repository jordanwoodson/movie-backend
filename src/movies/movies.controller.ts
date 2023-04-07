// src/movies/movies.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { MovieDto } from "./movie.dto";
import { Movie } from "./movie.schema";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    console.log("Received POST request for /movies:", movie);
    return this.moviesService.create(movie);
  }

  @Get()
  async getMovies() {
    return this.moviesService.getMovies();
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMovieDto: MovieDto
  ): Promise<Movie> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Movie> {
    return this.moviesService.delete(id);
  }
}

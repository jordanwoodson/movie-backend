// src/movies/movies.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { Movie } from './movie.schema';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
    return this.moviesService.create(movie);
  }
}

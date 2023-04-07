// src/movies/movies.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MovieDto } from "./movie.dto";
import { Movie, MovieDocument } from "./movie.schema";

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ) {}

  async create(movie: Movie): Promise<Movie> {
    const createdMovie = await this.movieModel.create(movie);
    return createdMovie.save();
  }

  async getMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async update(id: string, movieDto: MovieDto): Promise<Movie> {
    return await this.movieModel.findByIdAndUpdate(id, movieDto, { new: true });
  }

  async delete(id: string): Promise<Movie> {
    return await this.movieModel.findByIdAndRemove(id);
  }
}

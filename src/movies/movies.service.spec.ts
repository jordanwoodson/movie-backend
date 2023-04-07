// src/movies/movies.service.spec.ts
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model } from "mongoose";
import { Movie, MovieDocument } from "./movie.schema";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;
  let movieModel: Model<MovieDocument>;

  const movie: Movie = {
    name: "Example Movie",
    author: "Example Author",
  };

  const movieModelFactory = () => ({
    save: jest.fn().mockResolvedValue(movie),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie.name),
          useValue: {
            create: jest.fn(movieModelFactory),
            find: jest.fn().mockResolvedValue([]),
            findByIdAndUpdate: jest.fn().mockResolvedValue(movie),
            findByIdAndRemove: jest.fn().mockResolvedValue(movie),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieModel = module.get<Model<MovieDocument>>(getModelToken(Movie.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a movie", async () => {
      const createdMovie = await service.create(movie);
      expect(createdMovie).toEqual(movie);
      expect(movieModel.create).toHaveBeenCalledWith(movie);
    });
  });

  describe("getMovies", () => {
    it("should get all movies", async () => {
      const movies = await service.getMovies();
      expect(movies).toEqual([]);
      expect(movieModel.find).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should call MoviesService.update with the provided id and updateMovieDto and return the result", async () => {
      const id = "exampleId";
      const movieDto = { name: "Updated Movie", author: "Updated Author" };
      const updatedMovie = await service.update(id, movieDto);

      expect(updatedMovie).toEqual(movie);
      expect(movieModel.findByIdAndUpdate).toHaveBeenCalledWith(id, movieDto, {
        new: true,
      });
    });
  });

  describe("delete", () => {
    it("should call MoviesService.delete with the provided id and return the result", async () => {
      const id = "exampleId";
      const deletedMovie = await service.delete(id);

      expect(deletedMovie).toEqual(movie);
      expect(movieModel.findByIdAndRemove).toHaveBeenCalledWith(id);
    });
  });
});

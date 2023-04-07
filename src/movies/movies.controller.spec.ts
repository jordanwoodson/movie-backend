import { Test } from "@nestjs/testing";
import { Movie } from "./movie.schema";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";

const mockMoviesService = {
  create: jest.fn(),
  getMovies: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
} as Partial<MoviesService>;

describe("MoviesController", () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    moviesController = moduleRef.get<MoviesController>(MoviesController);
    moviesService = moduleRef.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(moviesController).toBeDefined();
  });

  describe("create", () => {
    it("should call MoviesService.create with the provided movie and return the result", async () => {
      const movie: Movie = {
        name: "Test Movie",
        author: "Test Author",
      };

      (moviesService.create as jest.Mock).mockImplementation(() =>
        Promise.resolve(movie)
      );

      const result = await moviesController.create(movie);

      expect(moviesService.create).toHaveBeenCalledWith(movie);
      expect(result).toEqual(movie);
    });
  });

  describe("getMovies", () => {
    it("should call MoviesService.getMovies and return the result", async () => {
      const movies: Movie[] = [
        { name: "Test Movie 1", author: "Test Author 1" },
        { name: "Test Movie 2", author: "Test Author 2" },
      ];

      (moviesService.getMovies as jest.Mock).mockImplementation(() =>
        Promise.resolve(movies)
      );

      const result = await moviesController.getMovies();

      expect(moviesService.getMovies).toHaveBeenCalled();
      expect(result).toEqual(movies);
    });
  });

  describe("put", () => {
    it("should call MoviesService.update with the provided id and updateMovieDto and return the result", async () => {
      const id = "exampleId";
      const updateMovieDto = {
        name: "Updated Movie",
        author: "Updated Author",
      };
      const updatedMovie = { ...updateMovieDto };
      (moviesService.update as jest.Mock).mockImplementation(() =>
        Promise.resolve(updatedMovie)
      );

      const result = await moviesController.update(id, updateMovieDto);

      expect(moviesService.update).toHaveBeenCalledWith(id, updateMovieDto);
      expect(result).toEqual(updatedMovie);
    });
  });

  describe("delete", () => {
    it("should call MoviesService.delete with the provided id and return the result", async () => {
      const id = "exampleId";
      const deletedMovie = { name: "Deleted Movie", author: "Deleted Author" };
      (moviesService.delete as jest.Mock).mockImplementation(() =>
        Promise.resolve(deletedMovie)
      );

      const result = await moviesController.delete(id);

      expect(moviesService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(deletedMovie);
    });
  });
});

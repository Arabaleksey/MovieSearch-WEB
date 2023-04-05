import axios from "axios";
import { IMovie, IMovieInfo } from "../interfaces/MovieInterfaces";

export default class MoviesService {
  static async getAllBySearch(searchValue: string, currentPage: number) {
    const response = await axios.get<{
      Search: IMovie[];
      totalResults: string;
      Response: boolean;
    }>(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=d1814f17&page=${currentPage}`
    );
    if (searchValue) {
      return response.data.Search;
    }
  };

  static async getMovieById(movieId: string) {
    const response = await axios.get<IMovieInfo>(
      `http://www.omdbapi.com/?i=${movieId}&apikey=d1814f17`
    );
    if (movieId) {
      return [response.data];
    }
  }
}

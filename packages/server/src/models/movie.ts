export interface Movie {
  movieCode: string;
  title: string;
  img: string | undefined;
  releaseDate: Date;
  imdbRating: number;
  genres: Array<string>;
  summary: string;
  cast: string;
  role: string;
}

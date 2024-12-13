export interface Game {
  _id: string;
  img?: string;
  title: string;
  releaseDate: Date;
  ignRating: number;
  genres: Array<string>;
  publisher: string;
  summary: string;
  mainCharacters: Array<string>;
  supportingCharacters: Array<string>;
  platforms: Array<string>;
}

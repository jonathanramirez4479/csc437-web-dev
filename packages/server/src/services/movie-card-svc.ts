import { Movie } from "models/movie";
import { Schema, model } from "mongoose";

const MovieSchema = new Schema<Movie>(
  {
    movieCode: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    releaseDate: { type: Date, required: true },
    imdbRating: { type: Number, required: true },
  },
  { collection: "movies" }
);

const MovieModel = model<Movie>("Movie", MovieSchema);

function index(): Promise<Movie[]> {
  return MovieModel.find();
}

function get(movieCode: String): Promise<Movie> {
  return MovieModel.find({ movieCode })
    .then((list) => list[0])
    .catch((error) => {
      throw `${movieCode} Not Found`;
    });
}

export default { index, get };

import { Movie } from "models/movie";
import { Schema, model } from "mongoose";

const MovieSchema = new Schema<Movie>(
  {
    movieCode: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    imgSrc: { data: Buffer, contentType: String },
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

function create(json: Movie): Promise<Movie> {
  const newMovie = new MovieModel(json);
  return newMovie.save();
}

function update(movieCode: String, movie: Movie): Promise<Movie> {
  return MovieModel.findOneAndUpdate({ movieCode }, movie, {
    new: true,
  }).then((updated) => {
    if (!updated) throw `${movieCode} not updated`;
    else return updated as Movie;
  });
}

function remove(movieCode: String): Promise<void> {
  return MovieModel.findOneAndDelete({ movieCode }).then((deleted) => {
    if (!deleted) throw `${movieCode} not deleted`;
  });
}

export default { index, get, create, update, remove };

import { Movie } from "models/movie";

const movies = {
  residentEvil: {
    title: "Resident Evil",
    imgSrc: "/images/movie-covers/re.jpg",
    releaseDate: new Date("2002-01-01"),
    imdbRating: 6.6,
  },
  residentEvilApoc: {
    title: "Resident Evil: Apocalypse",
    imgSrc: "/images/movie-covers/re-apocalypse.jpg",
    releaseDate: new Date("2004-01-02"),
    imdbRating: 6.1,
  },
  residentEvilExt: {
    title: "Resident Evil: Extinction",
    imgSrc: "/images/movie-covers/re-extinction.jpeg",
    releaseDate: new Date("2007-02-02"),
    imdbRating: 6.2,
  },
  residentEvilRet: {
    title: "Resident Evil: Retribution",
    imgSrc: "/images/movie-covers/re-retribution.jpg",
    releaseDate: new Date("2012-03-02"),
    imdbRating: 5.3,
  },
};

export function getMovies() {
  const movieList = Object.entries(movies).map(([key, value]) => value);
  return movieList;
}

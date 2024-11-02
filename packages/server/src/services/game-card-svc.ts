import { Game } from "models/game";

const gameCards = {
  re2: {
    imgSrc: "/images/game-covers/re2.webp",
    title: "Resident Evil 2",
    releaseDate: new Date("2022-04-01"),
    fanRating: 9.5,
  },
  re4: {
    imgSrc: "/images/game-covers/re4.jpg",
    title: "Resident Evil 4",
    releaseDate: new Date("2023-05-1"),
    fanRating: 10,
  },
  re0: {
    imgSrc: "/images/game-covers/re0.jpg",
    title: "Resident Evil 0",
    releaseDate: new Date("2000-09-10"),
    fanRating: 6.8,
  },
};

export function getGameCard(_: string) {
  return gameCards["re2"];
}

export function getGameCards() {
  const games_list = Object.entries(gameCards).map(([key, value]) => value);
  return games_list;
}

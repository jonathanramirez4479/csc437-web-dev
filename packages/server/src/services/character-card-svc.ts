import { Character } from "models/character";

const characters = {
  chrisRedfield: {
    name: "Chris Redfield",
    imgSrc: "/images/character-portraits/chris-redfield.jpg",
    fanRating: 9.5,
  },
  claireRedfield: {
    name: "Claire Redfield",
    imgSrc: "/images/character-portraits/claire-redfield.webp",
    fanRating: 10,
  },
  leonKennedy: {
    name: "Leon Kennedy",
    imgSrc: "/images/character-portraits/leon-kennedy.webp",
    fanRating: 9.8,
  },
  albertWesker: {
    name: "Albert Wesker",
    imgSrc: "/images/character-portraits/wesker.jpg",
    fanRating: 7.5,
  },
};

export function getCharacters() {
  const characterList = Object.entries(characters).map(([key, value]) => value);
  return characterList;
}

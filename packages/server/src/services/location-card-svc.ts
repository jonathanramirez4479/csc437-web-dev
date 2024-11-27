import { Location } from "models/location";

const locations = {
  rcpd: {
    name: "Racoon City Police Department",
    imgSrc: "/images/locations/rcpd.webp",
    appearsIn: ["Resident Evil 2"],
    fanRating: 9.9,
  },
  downtownRC: {
    name: "Downtown Racoon City",
    imgSrc: "/images/locations/re3-downtown-rc.webp",
    appearsIn: ["Resident Evil 3"],
    fanRating: 8.6,
  },
  village: {
    name: "The Village",
    imgSrc: "/images/locations/re4-village.webp",
    appearsIn: ["Resident Evil 4"],
    fanRating: 7.9,
  },
  rockfortPrison: {
    name: "Rockfort Prison",
    imgSrc: "/images/locations/rockfort-prison.webp",
    appearsIn: ["Resident Evil Code: Veronica"],
    fanRating: 5.6,
  },
};

export function getLocations() {
  const locationList = Object.entries(locations).map(([key, value]) => value);
  return locationList;
}

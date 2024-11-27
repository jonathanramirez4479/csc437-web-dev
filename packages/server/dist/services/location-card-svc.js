"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var location_card_svc_exports = {};
__export(location_card_svc_exports, {
  getLocations: () => getLocations
});
module.exports = __toCommonJS(location_card_svc_exports);
const locations = {
  rcpd: {
    name: "Racoon City Police Department",
    imgSrc: "/images/locations/rcpd.webp",
    appearsIn: ["Resident Evil 2"],
    fanRating: 9.9
  },
  downtownRC: {
    name: "Downtown Racoon City",
    imgSrc: "/images/locations/re3-downtown-rc.webp",
    appearsIn: ["Resident Evil 3"],
    fanRating: 8.6
  },
  village: {
    name: "The Village",
    imgSrc: "/images/locations/re4-village.webp",
    appearsIn: ["Resident Evil 4"],
    fanRating: 7.9
  },
  rockfortPrison: {
    name: "Rockfort Prison",
    imgSrc: "/images/locations/rockfort-prison.webp",
    appearsIn: ["Resident Evil Code: Veronica"],
    fanRating: 5.6
  }
};
function getLocations() {
  const locationList = Object.entries(locations).map(([key, value]) => value);
  return locationList;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLocations
});

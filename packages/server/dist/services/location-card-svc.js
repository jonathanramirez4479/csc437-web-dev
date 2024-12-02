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
  default: () => location_card_svc_default
});
module.exports = __toCommonJS(location_card_svc_exports);
var import_mongoose = require("mongoose");
const LocationSchema = new import_mongoose.Schema(
  {
    locationId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    imgSrc: { data: Buffer, contentType: String },
    appearsIn: {
      type: [String],
      set: (appearsIn) => appearsIn.map((name) => name.trim()),
      required: true
    },
    fanRating: { type: Number, required: true }
  },
  { collection: "locations" }
);
const LocationModel = (0, import_mongoose.model)("Location", LocationSchema);
function index() {
  return LocationModel.find();
}
function get(locationId) {
  return LocationModel.find({ locationId }).then((list) => list[0]).catch((error) => {
    throw `${locationId} Not Found`;
  });
}
function create(json) {
  const newLocation = new LocationModel(json);
  return newLocation.save();
}
function update(locationId, location) {
  return LocationModel.findOneAndUpdate({ locationId }, location, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${locationId} not updated`;
    else return updated;
  });
}
function remove(locationId) {
  return LocationModel.findOneAndDelete({ locationId }).then((deleted) => {
    if (!deleted) throw `${locationId} not deleted`;
  });
}
var location_card_svc_default = { index, get, create, update, remove };

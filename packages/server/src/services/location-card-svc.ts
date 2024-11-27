import { Location } from "models/location";
import { Schema, model } from "mongoose";

const LocationSchema = new Schema<Location>(
  {
    locationId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    imgSrc: { type: String, required: true, trim: true },
    appearsIn: {
      type: [String],
      set: (appearsIn: [String]) => appearsIn.map((name) => name.trim()),
      required: true,
    },
    fanRating: { type: Number, required: true },
  },
  { collection: "locations" }
);

const LocationModel = model<Location>("Location", LocationSchema);

function index(): Promise<Location[]> {
  return LocationModel.find();
}

function get(locationId: String): Promise<Location> {
  return LocationModel.find({ locationId })
    .then((list) => list[0])
    .catch((error) => {
      throw `${locationId} Not Found`;
    });
}

export default { index, get };

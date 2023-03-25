import mongoose from "mongoose";

const ParkingSpaceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    parkingSpaceType: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const parkingSpaceModel = mongoose.model("ParkingSpace", ParkingSpaceSchema);

export default parkingSpaceModel;

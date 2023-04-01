import ParkingSpace from "../mongodb/models/parkingSpace.js";
import User from '../mongodb/models/user.js';
import mongoose from "mongoose";

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const getAllParkingSpaces = async (req, res) => {
    const { _end, _order, _start, _sort, title_like = "", parkingSpaceType = "" } = req.query;

    const query = {};

    if(parkingSpaceType !== ''){
        query.parkingSpaceType = parkingSpaceType;
    }

    if(title_like){
        query.title = { $regex: title_like, $options: 'i' };
    }

    try {
        const count = await ParkingSpace.countDocuments({ query })

        const parkingSpaces = await ParkingSpace
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order});

        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers', 'x-total-count');

        res.status(200).json(parkingSpaces);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
const getParkingSpaceDetail = async (req, res) => {};
const createParkingSpace = async (req, res) => {
    try {
        const {title, description, parkingSpaceType, location, price, area, photo, email} = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({email}).session(session);

        if (!user) throw new Error('User not found');

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newParkingSpace = await ParkingSpace.create({
            title,
            description,
            parkingSpaceType,
            location,
            price,
            area,
            photo: photoUrl.url,
            creator: user._id
        })

        user.allParkingSpaces.push(newParkingSpace._id);
        await user.save({session})

        await session.commitTransaction();

        res.status(200).json({message: 'Parking space created successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};
const updateParkingSpace = async (req, res) => {};
const deleteParkingSpace = async (req, res) => {};

export {
    getAllParkingSpaces,
    getParkingSpaceDetail,
    createParkingSpace,
    updateParkingSpace,
    deleteParkingSpace
}

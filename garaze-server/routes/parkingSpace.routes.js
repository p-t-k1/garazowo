import express from 'express';

import { createParkingSpace, deleteParkingSpace, updateParkingSpace, getParkingSpaceDetail, getAllParkingSpaces } from "../controllers/parkingSpace.controller.js";

const router = express.Router()

router.route('/').get(getAllParkingSpaces);
router.route('/:id').get(getParkingSpaceDetail);
router.route('/').post(createParkingSpace);
router.route('/:id').patch(updateParkingSpace);
router.route('/:id').delete(deleteParkingSpace);

export default router;

import express from "express";
import {
  countByCity,
  countByType,
  createLocation,
  deleteLocation,
  getLocation,
  getLocationActivities,
  getLocations,
  updateLocation,
} from "../controllers/location.js";

import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", createLocation);

//UPDATE
router.put("/", verifyAdmin, updateLocation);
//DELETE
router.delete("/", verifyAdmin, deleteLocation);

//GET
router.get("/:id", getLocation);

//GET ALL
router.get("/", getLocations);

export default router;
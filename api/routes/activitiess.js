import express from "express";
import {
  createActivities,
  deleteActivities,
  getActivities,
  getActivitiess,
  updateActivities,
  updateActivitiesAvailability,
} from "../controllers/activities.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/", createActivities);

//UPDATE
router.put("/availability/:id", updateActivitiesAvailability);
router.put("/:id", verifyAdmin, updateActivities);
//DELETE
router.delete("/:id/:locationid", verifyAdmin, deleteActivities);
//GET

router.get("/:id", getActivities);
//GET ALL

router.get("/", getActivitiess);

export default router;
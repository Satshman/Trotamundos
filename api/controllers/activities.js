import Activities from "../models/Activities.js";
import Location from "../models/Location.js";
import { createError } from "../utils/error.js";

export const createActivities = async (req, res, next) => {
  const locationId = req.params.locationid;
  const newActivities = new Activities(req.body);

  try {
    const savedActivities = await newActivities.save();
    try {
      await Location.findByIdAndUpdate(locationId, {
        $push: { activitiess: savedActivities._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedActivities);
  } catch (err) {
    next(err);
  }
};

export const updateActivities = async (req, res, next) => {
  try {
    const updatedActivities = await Activities.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedActivities);
  } catch (err) {
    next(err);
  }
};
export const updateActivitiesAvailability = async (req, res, next) => {
  try {
    await Activities.updateOne(
      { "activitiesNumbers._id": req.params.id },
      {
        $push: {
          "activitiesNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Activity status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteActivities = async (req, res, next) => {
  const locationId = req.params.locationid;
  try {
    await Activities.findByIdAndDelete(req.params.id);
    try {
      await Location.findByIdAndUpdate(locationId, {
        $pull: { activitiess: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Activity has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getActivities = async (req, res, next) => {
  try {
    const activities = await Activities.findById(req.params.id);
    res.status(200).json(activities);
  } catch (err) {
    next(err);
  }
};
export const getActivitiess = async (req, res, next) => {
  try {
    const activitiess = await Activities.find();
    res.status(200).json(activitiess);
  } catch (err) {
    next(err);
  }
};
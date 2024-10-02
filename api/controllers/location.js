import Activities from "../models/Activities.js";
import Location from "../models/Location.js";

export const createLocation = async (req, res, next) => {
  const newLocation = new Location(req.body);

  try {
    const savedLocation = await newLocation.save();
    res.status(200).json(savedLocation);
  } catch (err) {
    next(err);
  }
};
export const updateLocation = async (req, res, next) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedLocation);
  } catch (err) {
    next(err);
  }
};
export const deleteLocation = async (req, res, next) => {
  try {
    await Location.findByIdAndDelete(req.params.id);
    res.status(200).json("Location has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    res.status(200).json(location);
  } catch (err) {
    next(err);
  }
};
export const getLocations = async (req, res, next) => {
  //const { min, max, ...others } = req.query;
  try {
    const locations = await Location.find();
      //...others,
      //cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    //}).limit(req.query.limit);
    res.status(200).json(locations);
    }catch (err) {
     next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Location.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hikingCount = await Location.countDocuments({ type: "senderismo" });
    const trekkingCount = await Location.countDocuments({ type: "trekking" });
    const campingCount = await Location.countDocuments({ type: "camping" });
    const climbingCount = await Location.countDocuments({ type: "escalada" });
    const otherCount = await Location.countDocuments({ type: "otra" });

    res.status(200).json([
      { type: "senderismo", count: hikingCount },
      { type: "trekking", count: trekkingCount },
      { type: "camping", count: campingCount },
      { type: "escalada", count: climbingCount },
      { type: "otra", count: otherCount },
    ]);
  } catch (err) {
    next(err);
  }
};
export const getLocationActivities = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    const list = await Promise.all(
      location.activitiess.map((activities) => {
        return Activities.findById(activities);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
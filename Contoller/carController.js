const carModel = require("../Model/Cars");

const addCar = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      price,
      details,
      speed,
      gps,
      automatic,
      noOfSeat,
      model,
      brand,
      product_images,
    } = req.body;

    const new_car = new carModel({
      name: name,
      price: price,
      details: details,
      speed: speed,
      gps: gps,
      automatic: automatic,
      noOfSeat: noOfSeat,
      model: model,
      brand: brand,
      image: product_images,
    });
    const saved_car = await new_car.save();
    console.log(saved_car);
    return res.status(201).json({
      message: "new car is created",
      car: saved_car,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const getCar = async (req, res) => {
  try {
    let cars;
    if (req.query.sort === "low") {
      cars = await carModel.find({}).sort({ price: 1 });
    }

    if (req.query.sort === "high") {
      cars = await carModel.find({}).sort({ price: -1 });
    }

    if (req.query.sort === "" || req.query.sort === undefined) {
      cars = await carModel.find({}).sort({ createdAt: -1 });
    }

    if (!cars || cars.length === 0) {
      return res.status(400).json({
        message: "No cars found!",
      });
    }
    if (req.query.sort === "desc") {
      cars.reverse();
    }
    res.status(200).json({
      message: "here is all car",
      cars: cars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occured while fetching the car",
      error: error.message,
    });
  }
};

const findCarDetails = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await carModel.findById(carId);
    if (!car) {
      return res.status(404).json({
        message: "Car not found!",
      });
    }
    // console.log(car);
    res.status(200).json({
      message: "car fetched successfully",
      car: car,
    });
  } catch (error) {
    //  console.log(error.message);
    res.status(500).json({
      message: "An error occured while fetching the car",
      error: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const carId = req.params.id;
    console.log("update-car", carId);

    const car = await carModel.findById(carId);
    if (!car) {
      return res.status(404).json({
        message: "car not found",
      });
    }

    const updatedCar = await carModel.findByIdAndUpdate(carId, req.body, {
      new: true,
    });

    console.log("updated carrrrrr ", updatedCar);

    res.status(200).json({
      message: "updated car",
      car: updatedCar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occured while updating the user",
      error: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id;
    console.log("delete-car", carId);

    const car = await carModel.findById(carId);
    if (!car) {
      return res.status(404).json({
        message: "car not found",
      });
    }

    const deletedCar = await carModel.findByIdAndDelete(carId);

    res.status(200).json({
      message: "Car deleted",
      car: deletedCar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while deleting the car",
      error: error.message,
    });
  }
};

module.exports = { addCar, getCar, findCarDetails, updateCar, deleteCar };

var Food = require('../models/food.model');

const getFoods = async function (req, res, next) {
    try {
        const foods = await Food.find({});
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getFood = async function (req, res, next) {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const insertFood = async function (req, res, next) {
    try {
        const food = await Food.create(req.body);
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFood = async function (req, res, next) {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndUpdate(id, req.body);

        if (!food) {
            res.status(404).json({ message: "Food not found" });
        }

        const updatedFood = await Food.findById(id);

        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const deleteFood = async function(req, res, next) {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id, req.body);

    if (!food) {
      res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = {
    getFoods,
    getFood,
    insertFood,
    updateFood,
    deleteFood
};
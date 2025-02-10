const Food = require('../models/Food');

// Get all foods for the logged-in user
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find({ userId: req.user.id });
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific food by ID
const getFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: "Food not found" });

        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Insert new food
const insertFood = async (req, res) => {
    try {
        const { name, price, image } = req.body;

        const food = await Food.create({
            userId: req.user.id,  // Associate food with logged-in user
            name,
            price,
            image
        });

        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a food item
const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: "Food not found" });

        // Update food data
        Object.assign(food, req.body);
        await food.save();

        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a food item
const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findByIdAndDelete(id);

        if (!food) return res.status(404).json({ message: "Food not found" });

        res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFoods,
    getFood,
    insertFood,
    updateFood,
    deleteFood
};

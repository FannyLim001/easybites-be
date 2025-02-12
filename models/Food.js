const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: [true, "Please enter food name"]
        },
        price: {
            type: Number,
            required: [true, "Please enter price"],
            default: 0
        },
        image: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;
var express = require('express');
var router = express.Router();
const { getFoods, getFood, insertFood, updateFood, deleteFood } = require('../controllers/food.controller');

/* Foods. */
router.get('/', getFoods);
router.get('/:id', getFood);
router.post('/', insertFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;

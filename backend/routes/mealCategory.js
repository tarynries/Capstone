const express = require("express");
const MealCategory = require("../models/mealCategory");

const router = express.Router();

/** GET /meal-categories => { mealCategories: [ { mealCategoryId, name }, ... ] }
 *
 * Returns a list of all meal categories.
 **/
router.get("/mealCategory", async function (req, res, next) {
    try {
        const mealCategories = await MealCategory.getAll();
        return res.json({ mealCategories });
    } catch (err) {
        return next(err);
    }
});

/** GET /meal-categories/:id => { mealCategory: { mealCategoryId, name } }
 *
 * Returns a specific meal category by its ID.
 **/
router.get("/mealCategory/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        const mealCategory = await MealCategory.getById(id);
        return res.json({ mealCategory });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

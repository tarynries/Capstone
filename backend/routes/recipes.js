const express = require("express");
const Recipe = require("../models/recipes");
const { ensureLoggedIn } = require("../middleware/auth");
// const jsonschema = require("jsonschema");
// const recipeSchema = require("../schemas/recipe.json");
//I dont think i need the schema if they arent editing the recipes 

const router = express.Router();



/** GET /recipes => { recipes: [{ recipe1 }, { recipe2 }, ...] }
 *
 * Returns a list of all recipes.
 **/
router.get("/recipes", ensureLoggedIn, async function (req, res, next) {
    try {
        const recipes = await Recipe.getAllRecipes();
        return res.json({ recipes });
    } catch (err) {
        return next(err);
    }
});

/** GET /recipes/meals/:categoryId => { recipes: [ { recipe1 }, { recipe2 }, ... ] }
 *
 * Returns a list of recipes for a specific meal category.
 **/
router.get("/recipes/meals/:categoryId", ensureLoggedIn, async function (req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        const recipes = await Recipe.getByMealCategory(categoryId);
        return res.json({ recipes });
    } catch (err) {
        return next(err);
    }
});

/** GET /recipes/:id => { recipe }
 *
 * Returns the recipe with the given ID.
 **/
router.get("/recipes/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.getRecipeById(recipeId);
        if (!recipe) {
            // Recipe not found
            return res.status(404).json({ error: "Recipe not found" });
        }
        return res.json({ recipe });
    } catch (err) {
        return next(err);
    }
});

// Other route handlers for recipe routes...

module.exports = router;

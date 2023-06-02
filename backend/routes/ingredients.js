const express = require("express");
const Ingredient = require("../models/ingredients");
const { ensureLoggedIn } = require("../middleware/auth");
// const jsonschema = require("jsonschema");
// const recipeSchema = require("../schemas/recipe.json");
//I dont think i need the schema if they arent editing the recipes 

const router = express.Router();



/** GET /ingredients => { ingredients: [{ ingredient1 }, { ingredient2 }, ...] }
 *
 * Returns a list of all recipes.
 **/
router.get("/ingredients", ensureLoggedIn, async function (req, res, next) {
    try {
        const recipes = await Ingredient.getAllIngredients();
        return res.json({ recipes });
    } catch (err) {
        return next(err);
    }
});

/** GET /ingredients/:id => { ingredient }
 *
 * Returns the ingredient with the given ID.
 **/
router.get("/ingredient/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.getIngredientById(ingredientId);
        if (!ingredient) {
            // Recipe not found
            return res.status(404).json({ error: "Ingredient not found" });
        }
        return res.json({ ingredient });
    } catch (err) {
        return next(err);
    }
});

// Other route handlers for ingredient routes...

module.exports = router;
const express = require("express");
const RecipeIngredientMapping = require("../models/recipeIngredient");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

/** GET /recipes/:recipeId/ingredients
 *  Get all ingredient mappings for a recipe.
 */
router.get("/recipes/:recipeId/ingredients", ensureLoggedIn, async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const ingredientMappings = await RecipeIngredientMapping.getByRecipeId(
            recipeId
        );
        return res.json({ ingredientMappings });
    } catch (err) {
        return next(err);
    }
});

/** GET /ingredients/:ingredientId/recipes
 *  Get all recipe mappings for an ingredient.
 */
router.get("/ingredients/:ingredientId/recipes", ensureLoggedIn, async (req, res, next) => {
    try {
        const { ingredientId } = req.params;
        const recipeMappings = await RecipeIngredientMapping.getByIngredientId(
            ingredientId
        );
        return res.json({ recipeMappings });
    } catch (err) {
        return next(err);
    }
});

/** POST /recipes/:recipeId/ingredients
 *  Add an ingredient mapping to a recipe.
 */
router.post("/recipes/:recipeId/ingredients", ensureLoggedIn, async (req, res, next) => {
    try {
        const { recipeId } = req.params;
        const { ingredientId, quantity } = req.body;
        const mapping = await RecipeIngredientMapping.addMapping(
            recipeId,
            ingredientId,
            quantity
        );
        return res.status(201).json({ mapping });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /recipes/:recipeId/ingredients/:ingredientId
 *  Remove an ingredient mapping from a recipe.
 */
router.delete(
    "/recipes/:recipeId/ingredients/:ingredientId", ensureLoggedIn,
    async (req, res, next) => {
        try {
            const { recipeId, ingredientId } = req.params;
            await RecipeIngredientMapping.removeMapping(recipeId, ingredientId);
            return res.json({ message: "Mapping removed successfully" });
        } catch (err) {
            return next(err);
        }
    }
);

module.exports = router;


//not sure if i want users to add / delete here 
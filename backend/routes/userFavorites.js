const express = require('express');
const UserFavorite = require('../models/userFavorites');
const { ensureLoggedIn } = require('../middleware/auth');

const router = express.Router();

/** POST /users/:userId/favorites/:recipeId
 * Adds a recipe to a user's favorites.
 * Returns { user_id, recipe_id }
 */
router.post('/users/:userId/favorites/:recipeId', ensureLoggedIn, async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        const favorite = await UserFavorite.addToFavorites(userId, recipeId);
        return res.status(201).json(favorite);
    } catch (err) {
        return next(err);
    }
});

/** DELETE /users/:userId/favorites/:recipeId
 * Removes a recipe from a user's favorites.
 * Returns an empty response.
 */
router.delete('/users/:userId/favorites/:recipeId', ensureLoggedIn, async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const recipeId = req.params.recipeId;
        await UserFavorite.removeFromFavorites(userId, recipeId);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
});

/** GET /users/:userId/favorites
 * Retrieves all favorite recipes for a user.
 * Returns an array of favorite recipes.
 */
router.get('/users/:userId/favorites', ensureLoggedIn, async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const favorites = await UserFavorite.getAllFavorites(userId);
        return res.json({ favorites });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

const db = require('../db');
const {
    NotFoundError,
    BadRequestError,
} = require('../expressError');

class UserFavorite {
    /** Add a recipe to a user's favorites.
     *
     * Returns { user_id, recipe_id }
     *
     * Throws BadRequestError if the user already has the recipe in their favorites.
     **/
    static async addToFavorites(userId, recipeId) {
        // Check if the user already has the recipe in their favorites
        const duplicateCheck = await db.query(
            `SELECT user_id, recipe_id
       FROM user_favorites
       WHERE user_id = $1 AND recipe_id = $2`,
            [userId, recipeId]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError('Recipe already in favorites');
        }

        const result = await db.query(
            `INSERT INTO user_favorites (user_id, recipe_id)
       VALUES ($1, $2)
       RETURNING user_id, recipe_id`,
            [userId, recipeId]
        );

        return result.rows[0];
    }

    /** Remove a recipe from a user's favorites.
     *
     * Returns undefined.
     *
     * Throws NotFoundError if the user does not have the recipe in their favorites.
     **/
    static async removeFromFavorites(userId, recipeId) {
        const result = await db.query(
            `DELETE FROM user_favorites
       WHERE user_id = $1 AND recipe_id = $2
       RETURNING user_id`,
            [userId, recipeId]
        );

        if (!result.rows[0]) {
            throw new NotFoundError('Recipe not found in favorites');
        }
    }

    /** Get all favorite recipes for a user.
     *
     * Returns [{ user_id, recipe_id, title, description, image_url, meal_category_id }, ...]
     **/
    static async getAllFavorites(userId) {
        const result = await db.query(
            `SELECT uf.user_id,
              uf.recipe_id,
              r.title,
              r.description,
              r.image_url,
              r.meal_category_id
       FROM user_favorites AS uf
       JOIN recipes AS r ON uf.recipe_id = r.recipe_id
       WHERE uf.user_id = $1`,
            [userId]
        );

        return result.rows;
    }
}

module.exports = UserFavorite;

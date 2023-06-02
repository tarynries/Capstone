const db = require("../db");
const { NotFoundError } = require("../expressError");

class Recipe {
    /** Get all recipes */
    static async getAll() {
        const result = await db.query(
            `SELECT recipe_id, title, description, image_url, meal_category_id
       FROM recipes
       ORDER BY title`
        );

        return result.rows;
    }

    /** Get recipes by meal category */
    static async getByMealCategory(categoryId) {
        const result = await db.query(
            `SELECT recipe_id, title, description, image_url, meal_category_id
       FROM recipes
       WHERE meal_category_id = $1
       ORDER BY title`,
            [categoryId]
        );

        return result.rows;
    }

    /** Get recipe by ID */
    static async getById(id) {
        const result = await db.query(
            `SELECT recipe_id, title, description, image_url, meal_category_id
       FROM recipes
       WHERE recipe_id = $1`,
            [id]
        );
        const recipe = result.rows[0];

        if (!recipe) {
            throw new NotFoundError(`Recipe not found with ID: ${id}`);
        }

        return recipe;
    }
}

module.exports = Recipe;

const db = require("../db");
const { NotFoundError } = require("../expressError");

class RecipeIngredientMapping {
    /** Get all ingredient mappings for a recipe */
    static async getByRecipeId(recipeId) {
        const result = await db.query(
            `SELECT r.recipe_id, r.title, r.description,
              i.ingredient_id, i.name, i.description,
              m.quantity
       FROM recipes AS r
       JOIN recipe_ingredient_mapping AS m ON r.recipe_id = m.recipe_id
       JOIN ingredients AS i ON m.ingredient_id = i.ingredient_id
       WHERE r.recipe_id = $1`,
            [recipeId]
        );

        console.log("SQL query:", result.sql);
        console.log("SQL parameters:", result.values);
        console.log("SQL query result:", result.rows);

        return result.rows;
    }

    /** Get all recipe mappings for an ingredient */
    static async getByIngredientId(ingredientId) {
        const result = await db.query(
            `SELECT r.recipe_id, r.title, r.description,
              i.ingredient_id, i.name, i.description,
              m.quantity
       FROM recipes AS r
       JOIN recipe_ingredient_mapping AS m ON r.recipe_id = m.recipe_id
       JOIN ingredients AS i ON m.ingredient_id = i.ingredient_id
       WHERE i.ingredient_id = $1`,
            [ingredientId]
        );

        return result.rows;
    }

    /** Add an ingredient mapping to a recipe */
    static async addMapping(recipeId, ingredientId, quantity) {
        const result = await db.query(
            `INSERT INTO recipe_ingredient_mapping (recipe_id, ingredient_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING recipe_id, ingredient_id, quantity`,
            [recipeId, ingredientId, quantity]
        );

        return result.rows[0];
    }

    /** Remove an ingredient mapping from a recipe */
    static async removeMapping(recipeId, ingredientId) {
        const result = await db.query(
            `DELETE FROM recipe_ingredient_mapping
       WHERE recipe_id = $1 AND ingredient_id = $2
       RETURNING recipe_id, ingredient_id`,
            [recipeId, ingredientId]
        );
        const mapping = result.rows[0];

        if (!mapping) {
            throw new NotFoundError("Recipe ingredient mapping not found");
        }
        return mapping;
    }
}

module.exports = RecipeIngredientMapping;


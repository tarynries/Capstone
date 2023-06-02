const db = require("../db");
const { NotFoundError } = require("../expressError");

class Ingredient {
    /** Get all ingredients */
    static async getAll() {
        const result = await db.query(
            `SELECT ingredient_id, name, description
       FROM ingredients
       ORDER BY name`
        );

        return result.rows;
    }

    /** Get ingredient by ID */
    static async getById(id) {
        const result = await db.query(
            `SELECT ingredient_id, name, description
       FROM ingredients
       WHERE ingredient_id = $1`,
            [id]
        );
        const ingredient = result.rows[0];

        if (!ingredient) {
            throw new NotFoundError(`Ingredient not found with ID: ${id}`);
        }

        return ingredient;
    }
}

module.exports = Ingredient;
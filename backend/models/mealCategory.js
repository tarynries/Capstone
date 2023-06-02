const db = require("../db");
const { NotFoundError } = require("../expressError");

class MealCategory {
    /** Get all meal categories */
    static async getAll() {
        const result = await db.query(
            `SELECT meal_category_id, name
       FROM meal_categories
       ORDER BY name`
        );

        return result.rows;
    }

    /** Get meal category by ID */
    static async getById(id) {
        const result = await db.query(
            `SELECT meal_category_id, name
       FROM meal_categories
       WHERE meal_category_id = $1`,
            [id]
        );
        const category = result.rows[0];

        if (!category) {
            throw new NotFoundError(`Meal category not found with ID: ${id}`);
        }

        return category;
    }
}

module.exports = MealCategory;

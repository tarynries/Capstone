const db = require("../db");
const { NotFoundError } = require("../expressError");

class ShoppingList {
    /** Create a shopping list and associate it with a user.
     *
     * Returns the newly created shopping list.
     */
    static async create(userId, name) {
        const result = await db.query(
            `INSERT INTO shopping_lists (user_id, name)
       VALUES ($1, $2)
       RETURNING list_id, user_id, name`,
            [userId, name]
        );
        return result.rows[0];
    }

    /** Get all shopping lists associated with a user.
     *
     * Returns an array of shopping lists.
     */
    static async getByUser(userId) {
        const result = await db.query(
            `SELECT list_id, user_id, name
       FROM shopping_lists
       WHERE user_id = $1
       ORDER BY list_id`,
            [userId]
        );
        return result.rows;
    }

    /** Get a shopping list by its ID.
     *
     * Returns the shopping list or throws a NotFoundError if not found.
     */
    static async getById(listId) {
        const result = await db.query(
            `SELECT list_id, user_id, name
       FROM shopping_lists
       WHERE list_id = $1`,
            [listId]
        );
        const shoppingList = result.rows[0];
        if (!shoppingList) throw new NotFoundError(`Shopping list not found: ${listId}`);
        return shoppingList;
    }

    /** Update the name of a shopping list.
     *
     * Returns the updated shopping list.
     */
    static async update(listId, name) {
        const result = await db.query(
            `UPDATE shopping_lists
       SET name = $2
       WHERE list_id = $1
       RETURNING list_id, user_id, name`,
            [listId, name]
        );
        const shoppingList = result.rows[0];
        if (!shoppingList) throw new NotFoundError(`Shopping list not found: ${listId}`);
        return shoppingList;
    }

    /** Delete a shopping list.
     *
     * Returns undefined.
     */
    static async delete(listId) {
        const result = await db.query(
            `DELETE FROM shopping_lists
       WHERE list_id = $1
       RETURNING list_id`,
            [listId]
        );
        if (result.rows.length === 0) {
            throw new NotFoundError(`Shopping list not found: ${listId}`);
        }
    }
}

module.exports = ShoppingList;

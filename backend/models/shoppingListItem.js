const db = require("../db");
const { NotFoundError } = require("../expressError");

class ShoppingListItem {
    /** Create a shopping list item.
     *
     * Returns the newly created shopping list item.
     */
    static async create(listId, ingredientId, quantity) {
        const result = await db.query(
            `INSERT INTO shopping_list_items (list_id, ingredient_id, quantity, checked)
       VALUES ($1, $2, $3, false)
       RETURNING item_id, list_id, ingredient_id, quantity, checked`,
            [listId, ingredientId, quantity]
        );
        return result.rows[0];
    }

    /** Get all shopping list items for a given shopping list.
     *
     * Returns an array of shopping list items.
     */
    static async getAllByList(listId) {
        const result = await db.query(
            `SELECT item_id, list_id, ingredient_id, quantity, checked
       FROM shopping_list_items
       WHERE list_id = $1
       ORDER BY item_id`,
            [listId]
        );
        return result.rows;
    }

    /** Get a shopping list item by its ID.
     *
     * Returns the shopping list item or throws a NotFoundError if not found.
     */
    static async getById(itemId) {
        const result = await db.query(
            `SELECT item_id, list_id, ingredient_id, quantity, checked
       FROM shopping_list_items
       WHERE item_id = $1`,
            [itemId]
        );
        const shoppingListItem = result.rows[0];
        if (!shoppingListItem) throw new NotFoundError(`Shopping list item not found: ${itemId}`);
        return shoppingListItem;
    }

    /** Update the quantity and checked status of a shopping list item.
     *
     * Returns the updated shopping list item.
     */
    static async update(itemId, quantity, checked) {
        const result = await db.query(
            `UPDATE shopping_list_items
       SET quantity = $2, checked = $3
       WHERE item_id = $1
       RETURNING item_id, list_id, ingredient_id, quantity, checked`,
            [itemId, quantity, checked]
        );
        const shoppingListItem = result.rows[0];
        if (!shoppingListItem) throw new NotFoundError(`Shopping list item not found: ${itemId}`);
        return shoppingListItem;
    }

    /** Delete a shopping list item.
     *
     * Returns undefined.
     */
    static async delete(itemId) {
        const result = await db.query(
            `DELETE FROM shopping_list_items
       WHERE item_id = $1
       RETURNING item_id`,
            [itemId]
        );
        if (result.rows.length === 0) {
            throw new NotFoundError(`Shopping list item not found: ${itemId}`);
        }
    }
}

module.exports = ShoppingListItem;

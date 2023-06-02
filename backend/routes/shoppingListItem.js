const express = require("express");
const ShoppingListItem = require("../models/shoppingListItem");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

/** POST /shopping-lists/:listId/items
 * Creates a new shopping list item.
 * Returns the newly created shopping list item.
 */
router.post("/shopping-lists/:listId/items", ensureLoggedIn, async function (req, res, next) {
    try {
        const listId = req.params.listId;
        const { ingredientId, quantity } = req.body;
        const newItem = await ShoppingListItem.create(listId, ingredientId, quantity);
        return res.status(201).json({ item: newItem });
    } catch (err) {
        return next(err);
    }
});

/** GET /shopping-lists/:listId/items
 * Returns all shopping list items for a given shopping list.
 */
router.get("/shopping-lists/:listId/items", ensureLoggedIn, async function (req, res, next) {
    try {
        const listId = req.params.listId;
        const items = await ShoppingListItem.getAllByList(listId);
        return res.json({ items });
    } catch (err) {
        return next(err);
    }
});

/** GET /shopping-list-items/:itemId
 * Returns a specific shopping list item by its ID.
 */
router.get("/shopping-list-items/:itemId", ensureLoggedIn, async function (req, res, next) {
    try {
        const itemId = req.params.itemId;
        const item = await ShoppingListItem.getById(itemId);
        return res.json({ item });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /shopping-list-items/:itemId
 * Updates the quantity and checked status of a shopping list item.
 * Returns the updated shopping list item.
 */
router.patch("/shopping-list-items/:itemId", ensureLoggedIn, async function (req, res, next) {
    try {
        const itemId = req.params.itemId;
        const { quantity, checked } = req.body;
        const updatedItem = await ShoppingListItem.update(itemId, quantity, checked);
        return res.json({ item: updatedItem });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /shopping-list-items/:itemId
 * Deletes a shopping list item.
 * Returns an empty response.
 */
router.delete("/shopping-list-items/:itemId", ensureLoggedIn, async function (req, res, next) {
    try {
        const itemId = req.params.itemId;
        await ShoppingListItem.delete(itemId);
        return res.sendStatus(204);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

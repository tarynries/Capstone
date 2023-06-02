const express = require("express");
const ShoppingList = require("../models/shoppingList");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

// Existing routes...

/** POST /shopping-lists => { list }
 *
 * Create a new shopping list for the authenticated user.
 */
router.post("/shopping-lists", ensureLoggedIn, async function (req, res, next) {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object
        const { name } = req.body;

        const list = await ShoppingList.create(userId, name);
        return res.status(201).json({ list });
    } catch (err) {
        return next(err);
    }
});

/** GET /shopping-lists => { lists: [ { list1 }, { list2 }, ... ] }
 *
 * Retrieve all shopping lists associated with the authenticated user.
 */
router.get("/shopping-lists", ensureLoggedIn, async function (req, res, next) {
    try {
        const userId = req.user.id; // Assuming user ID is available in the request object

        const lists = await ShoppingList.getByUser(userId);
        return res.json({ lists });
    } catch (err) {
        return next(err);
    }
});

/** GET /shopping-lists/:id => { list }
 *
 * Retrieve a specific shopping list by its ID.
 */
router.get("/shopping-lists/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const listId = req.params.id;

        const list = await ShoppingList.getById(listId);
        return res.json({ list });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /shopping-lists/:id => { list }
 *
 * Update the name of a specific shopping list.
 */
router.patch("/shopping-lists/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const listId = req.params.id;
        const { name } = req.body;

        const list = await ShoppingList.update(listId, name);
        return res.json({ list });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /shopping-lists/:id
 *
 * Delete a specific shopping list.
 */
router.delete("/shopping-lists/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const listId = req.params.id;

        await ShoppingList.delete(listId);
        return res.json({ message: "Shopping list deleted successfully" });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

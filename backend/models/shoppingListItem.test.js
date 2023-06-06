const db = require("../db");
const { NotFoundError } = require("../expressError");
const ShoppingListItem = require("./shoppingListItem");

beforeAll(async function () {
    // Set up any necessary data before running the tests
});

afterAll(async function () {
    // Clean up any data created during the tests
});

describe("create", function () {
    test("should create a new shopping list item and return it", async function () {
        const listId = 1;
        const ingredientId = 1;
        const quantity = "2 cups";

        const newItem = await ShoppingListItem.create(listId, ingredientId, quantity);

        expect(newItem.item_id).toBeDefined();
        expect(newItem.list_id).toBe(listId);
        expect(newItem.ingredient_id).toBe(ingredientId);
        expect(newItem.quantity).toBe(quantity);
        expect(newItem.checked).toBe(false);
    });
});

describe("getAllByList", function () {
    test("should return all shopping list items for a given shopping list", async function () {
        const listId = 1;

        const items = await ShoppingListItem.getAllByList(listId);

        expect(items.length).toBeGreaterThan(0);
        expect(items[0].list_id).toBe(listId);
    });
});

describe("getById", function () {
    test("should return a shopping list item by its ID", async function () {
        const itemId = 2;

        const item = await ShoppingListItem.getById(itemId);

        expect(item.item_id).toBe(itemId);
    });

    test("should throw a NotFoundError if the shopping list item is not found", async function () {
        const itemId = 100;

        await expect(ShoppingListItem.getById(itemId)).rejects.toThrowError(
            NotFoundError
        );
    });
});

describe("update", function () {
    test("should update the quantity and checked status of a shopping list item", async function () {
        const itemId = 2;
        const quantity = "2 cups";
        const checked = true;

        const updatedItem = await ShoppingListItem.update(itemId, quantity, checked);

        expect(updatedItem.item_id).toBe(itemId);
        expect(updatedItem.quantity).toBe(quantity);
        expect(updatedItem.checked).toBe(checked);
    });

    test("should throw a NotFoundError if the shopping list item is not found", async function () {
        const itemId = 100;
        const quantity = "3 cups";
        const checked = true;

        await expect(
            ShoppingListItem.update(itemId, quantity, checked)
        ).rejects.toThrowError(NotFoundError);
    });
});

describe("delete", function () {
    test("should delete a shopping list item", async function () {
        const itemId = 2;

        await ShoppingListItem.delete(itemId);

        // Ensure the item is deleted by trying to fetch it again
        await expect(ShoppingListItem.getById(itemId)).rejects.toThrowError(
            NotFoundError
        );
    });

    test("should throw a NotFoundError if the shopping list item is not found", async function () {
        const itemId = 100;

        await expect(ShoppingListItem.delete(itemId)).rejects.toThrowError(
            NotFoundError
        );
    });
});

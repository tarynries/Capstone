const db = require("../db");
const { NotFoundError } = require("../expressError");
const ShoppingList = require("./shoppingList");

beforeAll(async function () {
  // Set up the necessary test data
  await db.query("DELETE FROM shopping_lists");

  await db.query(`
    INSERT INTO shopping_lists (list_id, user_id, name)
    VALUES (1, 1, 'List1'),
           (2, 1, 'List2'),
           (3, 2, 'List3')`);
});

afterAll(async function () {
  // Clean up the test data
  await db.query("DELETE FROM shopping_lists");
  await db.end();
});

describe("ShoppingList", function () {
  describe("create", function () {
    test("should create a new shopping list and return it", async function () {
      const userId = 1;
      const name = "New List";

      const newList = await ShoppingList.create(userId, name);

      expect(newList.list_id).toBeDefined();
      expect(newList.user_id).toBe(userId);
      expect(newList.name).toBe(name);
    });
  });

  describe("getByUser", function () {
    test("should return all shopping lists associated with a user", async function () {
      const userId = 1;

      const lists = await ShoppingList.getByUser(userId);

      expect(lists).toHaveLength(3);
      expect(lists[0].list_id).toBe(1);
      expect(lists[0].user_id).toBe(userId);
      expect(lists[0].name).toBe("List1");
      expect(lists[1].list_id).toBe(2);
      expect(lists[1].user_id).toBe(userId);
      expect(lists[1].name).toBe("List2");
      expect(lists[2].list_id).toBeDefined();
      expect(lists[2].user_id).toBe(userId);
      expect(lists[2].name).toBe("New List");
    });

    test("should return an empty array if no shopping lists found for the user", async function () {
      const userId = 3;

      const lists = await ShoppingList.getByUser(userId);

      expect(lists).toHaveLength(0);
    });
  });

  describe("getById", function () {
    test("should return a shopping list by its ID", async function () {
      const listId = 1;

      const list = await ShoppingList.getById(listId);

      expect(list.list_id).toBe(listId);
      expect(list.user_id).toBe(1);
      expect(list.name).toBe("List1");
    });

    test("should throw a NotFoundError if the shopping list is not found", async function () {
      const listId = 4;

      await expect(ShoppingList.getById(listId)).rejects.toThrow(NotFoundError);
    });
  });

  describe("update", function () {
    test("should update the name of a shopping list", async function () {
      const listId = 1;
      const newName = "Updated List";

      const updatedList = await ShoppingList.update(listId, newName);

      expect(updatedList.list_id).toBe(listId);
      expect(updatedList.user_id).toBe(1);
      expect(updatedList.name).toBe(newName);
    });

    test("should throw a NotFoundError if the shopping list is not found", async function () {
      const listId = 4;
      const newName = "Updated List";

      await expect(ShoppingList.update(listId, newName)).rejects.toThrow(NotFoundError);
    });
  });

  describe("delete", function () {
    test("should delete a shopping list", async function () {
      const listId = 1;

      await ShoppingList.delete(listId);

      // Verify that the shopping list is deleted
      await expect(ShoppingList.getById(listId)).rejects.toThrow(NotFoundError);
    });

    test("should throw a NotFoundError if the shopping list is not found", async function () {
      const listId = 4;

      await expect(ShoppingList.delete(listId)).rejects.toThrow(NotFoundError);
    });
  });
});

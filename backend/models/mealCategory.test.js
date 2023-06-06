"use strict";

const db = require("../db.js");
const { NotFoundError } = require("../expressError");
const MealCategory = require("./mealCategory.js");

beforeAll(async function () {
    await db.query("DELETE FROM meal_categories");

    await db.query(`
    INSERT INTO meal_categories (meal_category_id, name)
    VALUES (1, 'Category1'),
           (2, 'Category2'),
           (3, 'Category3')
  `);
});

afterAll(async function () {
    await db.query("DELETE FROM meal_categories");
    await db.end();
});

/************************************** getAll */

describe("getAll", function () {
    test("should return all meal categories", async function () {
        const categories = await MealCategory.getAll();

        expect(categories).toEqual([
            {
                meal_category_id: 1,
                name: "Category1",
            },
            {
                meal_category_id: 2,
                name: "Category2",
            },
            {
                meal_category_id: 3,
                name: "Category3",
            },
        ]);
    });
});

/************************************** getById */

describe("getById", function () {
    test("should return the meal category with the given ID", async function () {
        const category = await MealCategory.getById(1);

        expect(category).toEqual({
            meal_category_id: 1,
            name: "Category1",
        });
    });

    test("should throw a NotFoundError if meal category is not found", async function () {
        try {
            await MealCategory.getById(100);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual("Meal category not found with ID: 100");
        }
    });
});

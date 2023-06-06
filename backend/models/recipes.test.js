"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const Recipe = require("./recipes");

beforeAll(async function () {
    await db.query("DELETE FROM recipes");

    await db.query(`
    INSERT INTO recipes (recipe_id, title, description, image_url, meal_category_id)
    VALUES 
      (1, 'Recipe1', 'Description1', 'image1.jpg', 1),
      (2, 'Recipe2', 'Description2', 'image2.jpg', 2),
      (3, 'Recipe3', 'Description3', 'image3.jpg', 1)
  `);
});

afterAll(async function () {
    await db.query("DELETE FROM recipes");
    await db.end();
});

/************************************** getAll */

describe("getAll", function () {
    test("should return all recipes", async function () {
        const recipes = await Recipe.getAll();

        expect(recipes).toEqual([
            {
                recipe_id: 1,
                title: "Recipe1",
                description: "Description1",
                image_url: "image1.jpg",
                meal_category_id: 1,
            },
            {
                recipe_id: 2,
                title: "Recipe2",
                description: "Description2",
                image_url: "image2.jpg",
                meal_category_id: 2,
            },
            {
                recipe_id: 3,
                title: "Recipe3",
                description: "Description3",
                image_url: "image3.jpg",
                meal_category_id: 1,
            },
        ]);
    });
});

/************************************** getByMealCategory */

describe("getByMealCategory", function () {
    test("should return recipes by meal category", async function () {
        const recipes = await Recipe.getByMealCategory(1);

        expect(recipes).toEqual([
            {
                recipe_id: 1,
                title: "Recipe1",
                description: "Description1",
                image_url: "image1.jpg",
                meal_category_id: 1,
            },
            {
                recipe_id: 3,
                title: "Recipe3",
                description: "Description3",
                image_url: "image3.jpg",
                meal_category_id: 1,
            },
        ]);
    });

    test("should return an empty array if no recipes found for the meal category", async function () {
        const recipes = await Recipe.getByMealCategory(100);

        expect(recipes).toEqual([]);
    });
});

/************************************** getById */

describe("getById", function () {
    test("should return the recipe with the given ID", async function () {
        const recipe = await Recipe.getById(1);

        expect(recipe).toEqual({
            recipe_id: 1,
            title: "Recipe1",
            description: "Description1",
            image_url: "image1.jpg",
            meal_category_id: 1,
        });
    });

    test("should throw a NotFoundError if recipe is not found", async function () {
        try {
            await Recipe.getById(100);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual("Recipe not found with ID: 100");
        }
    });
});

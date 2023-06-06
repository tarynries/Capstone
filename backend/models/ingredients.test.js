"use strict";

const db = require("../db.js");
const { NotFoundError } = require("../expressError");
const Ingredient = require("./ingredients.js");

beforeAll(async function () {
    await db.query("DELETE FROM ingredients");

    await db.query(`
    INSERT INTO ingredients (ingredient_id, name, description)
    VALUES (1, 'Ingredient1', 'Description1'),
           (2, 'Ingredient2', 'Description2'),
           (3, 'Ingredient3', 'Description3')
  `);
});

afterAll(async function () {
    await db.query("DELETE FROM ingredients");
    await db.end();
});

/************************************** getAll */

describe("getAll", function () {
    test("should return all ingredients", async function () {
        const ingredients = await Ingredient.getAll();

        expect(ingredients).toEqual([
            {
                ingredient_id: 1,
                name: "Ingredient1",
                description: "Description1",
            },
            {
                ingredient_id: 2,
                name: "Ingredient2",
                description: "Description2",
            },
            {
                ingredient_id: 3,
                name: "Ingredient3",
                description: "Description3",
            },
        ]);
    });
});

/************************************** getById */

describe("getById", function () {
    test("should return the ingredient with the given ID", async function () {
        const ingredient = await Ingredient.getById(1);

        expect(ingredient).toEqual({
            ingredient_id: 1,
            name: "Ingredient1",
            description: "Description1",
        });
    });

    test("should throw a NotFoundError if ingredient is not found", async function () {
        try {
            await Ingredient.getById(100);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
            expect(err.message).toEqual("Ingredient not found with ID: 100");
        }
    });
});

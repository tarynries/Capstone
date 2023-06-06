"use strict";

const db = require("../db.js");
const { NotFoundError } = require("../expressError");
const RecipeIngredientMapping = require("./recipeIngredient.js");

beforeAll(async function () {
    await db.query("DELETE FROM recipe_ingredient_mapping");
    await db.query("DELETE FROM recipes");
    await db.query("DELETE FROM ingredients");

    await db.query(`
    INSERT INTO recipes (title, description)
    VALUES ('Recipe1', 'Description1'),
           ('Recipe2', 'Description2')`);

    await db.query(`
    INSERT INTO ingredients (name, description)
    VALUES ('Ingredient1', 'Description1'),
           ('Ingredient2', 'Description2')`);

    await db.query(`
    INSERT INTO recipe_ingredient_mapping (recipe_id, ingredient_id, quantity)
    VALUES (1, 1, '1 cup'),
           (1, 2, '2 tsp'),
           (2, 1, '2 cups')`);
});

afterAll(async function () {
    await db.query("DELETE FROM recipe_ingredient_mapping");
    await db.query("DELETE FROM recipes");
    await db.query("DELETE FROM ingredients");
    await db.end();
});

/************************************** getByRecipeId */

async function testDbQuery() {
    try {
        const result = await db.query("SELECT * FROM recipe_ingredient_mapping");
        console.log("Query Result:", result.rows);
    } catch (error) {
        console.error("Query Error:", error);
    }
}

testDbQuery();


describe("getByRecipeId", function () {
    test("should return all ingredient mappings for a recipe", async function () {
        const mappings = await RecipeIngredientMapping.getByRecipeId(1);
        // debugger;

        console.log("mapping", mappings);
        console.log("recipeId:", 1);
        expect(mappings).toEqual([
            {
                recipe_id: 1,
                title: "Recipe1",
                description: "Description1",
                ingredient_id: 1,
                name: "Ingredient1",
                quantity: "1 cup",
            },
            {
                recipe_id: 1,
                title: "Recipe1",
                description: "Description1",
                ingredient_id: 2,
                name: "Ingredient2",
                quantity: "2 tsp",
            },
        ]);

    });
    // describe("getByRecipeId", function () {
    //     test("should return all ingredient mappings for a recipe", async function () {
    //         const mappings = await RecipeIngredientMapping.getByRecipeId(1);

    //         console.log("mapping", mappings);

    //         expect(mappings.length).toEqual(2); // Check the number of mappings

    //         // Check the properties of the first mapping
    //         expect(mappings[0].recipe_id).toEqual(1);
    //         expect(mappings[0].title).toEqual("Recipe1");
    //         expect(mappings[0].description).toEqual("Description1");
    //         expect(mappings[0].ingredient_id).toEqual(1);
    //         expect(mappings[0].name).toEqual("Ingredient1");
    //         expect(mappings[0].quantity).toEqual("1 cup");

    //         // Check the properties of the second mapping
    //         expect(mappings[1].recipe_id).toEqual(1);
    //         expect(mappings[1].title).toEqual("Recipe1");
    //         expect(mappings[1].description).toEqual("Description1");
    //         expect(mappings[1].ingredient_id).toEqual(2);
    //         expect(mappings[1].name).toEqual("Ingredient2");
    //         expect(mappings[1].quantity).toEqual("2 tsp");
    //     });

});



/************************************** getByIngredientId */

// describe("getByIngredientId", function () {
//     test("should return all recipe mappings for an ingredient", async function () {
//         const mappings = await RecipeIngredientMapping.getByIngredientId(1);

//         expect(mappings).toEqual([
//             {
//                 recipe_id: 1,
//                 title: "Recipe1",
//                 description: "Description1",
//                 ingredient_id: 1,
//                 name: "Ingredient1",
//                 quantity: "1 cup",
//             },
//             {
//                 recipe_id: 2,
//                 title: "Recipe2",
//                 description: "Description2",
//                 ingredient_id: 1,
//                 name: "Ingredient1",
//                 quantity: "2 cups",
//             },
//         ]);
//     });
// });

// /************************************** addMapping */

// describe("addMapping", function () {
//     test("should add an ingredient mapping to a recipe", async function () {
//         const recipeId = 2;
//         const ingredientId = 2;
//         const quantity = "3 tbsp";

//         const newMapping = await RecipeIngredientMapping.addMapping(
//             recipeId,
//             ingredientId,
//             quantity
//         );

//         expect(newMapping).toEqual({
//             recipe_id: recipeId,
//             ingredient_id: ingredientId,
//             quantity: quantity,
//         });
//     });
// });

// /************************************** removeMapping */

// describe("removeMapping", function () {
//     test("should remove an ingredient mapping from a recipe", async function () {
//         const recipeId = 1;
//         const ingredientId = 2;

//         await RecipeIngredientMapping.removeMapping(recipeId, ingredientId);

//         try {
//             await RecipeIngredientMapping.getById(recipeId, ingredientId);
//             fail();
//         } catch (err) {
//             expect(err instanceof NotFoundError).toBeTruthy();
//             expect(err.message).toEqual("Recipe ingredient mapping not found");
//         }
//     });

//     test("should throw a NotFoundError if ingredient mapping is not found", async function () {
//         const recipeId = 100;
//         const ingredientId = 100;

//         try {
//             await RecipeIngredientMapping.removeMapping(recipeId, ingredientId);
//             fail();
//         } catch (err) {
//             expect(err instanceof NotFoundError).toBeTruthy();
//             expect(err.message).toEqual("Recipe ingredient mapping not found");
//         }
//     });
// });



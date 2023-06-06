const request = require("supertest");
const app = require("../app");
// const Recipe = require("../models/recipes");

describe("Recipe Routes", () => {
    describe("GET /recipes", () => {
        test("should return a list of all recipes", async () => {
            const response = await request(app).get("/recipes").expect(200);

            // Verify the response body structure and properties
            expect(response.body).toHaveProperty("recipes");
            expect(Array.isArray(response.body.recipes)).toBe(true);
        });
    });

    describe("GET /recipes/meals/:categoryId", () => {
        test("should return a list of recipes for a specific meal category", async () => {
            const categoryId = "example-category-id"; // Replace with a valid category ID

            const response = await request(app)
                .get(`/recipes/meals/${categoryId}`)
                .expect(200);

            // Verify the response body structure and properties
            expect(response.body).toHaveProperty("recipes");
            expect(Array.isArray(response.body.recipes)).toBe(true);
        });
    });

    describe("GET /recipes/:id", () => {
        test("should return the recipe with the given ID", async () => {
            const recipeId = "example-recipe-id"; // Replace with a valid recipe ID

            const response = await request(app)
                .get(`/recipes/${recipeId}`)
                .expect(200);

            // Verify the response body structure and properties
            expect(response.body).toHaveProperty("recipe");
            expect(response.body.recipe).toBeDefined();
        });

        test("should return 404 if recipe is not found", async () => {
            const recipeId = "non-existent-recipe-id";

            const response = await request(app)
                .get(`/recipes/${recipeId}`)
                .expect(404);

            // Verify the response body structure and error message
            expect(response.body).toHaveProperty("error", "Recipe not found");
        });
    });

    // Add more tests for other recipe routes as needed
});

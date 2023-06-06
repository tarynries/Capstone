const request = require("supertest");
const app = require("../app"); // Assuming your Express app is exported from app.js

// const {
//     commonBeforeAll,
//     commonBeforeEach,
//     commonAfterEach,
//     commonAfterAll,
// } = require("./testSetUp");

// beforeAll(commonBeforeAll);
// beforeEach(commonBeforeEach);
// afterEach(commonAfterEach);
// afterAll(commonAfterAll);

describe("GET /ingredients", () => {
    test("should return a list of all ingredients", async () => {
        const response = await request(app).get("/ingredients").expect(200);

        // Verify the response body structure and properties
        expect(response.body).toHaveProperty("recipes");
        expect(Array.isArray(response.body.recipes)).toBe(true);
    });
});

describe("GET /ingredient/:id", () => {
    test("should return the ingredient with the given ID", async () => {
        const ingredientId = "example-id"; // Replace with a valid ingredient ID

        const response = await request(app).get(`/ingredient/${ingredientId}`).expect(200);

        // Verify the response body structure and properties
        expect(response.body).toHaveProperty("ingredient");
        expect(response.body.ingredient).toHaveProperty("id", ingredientId);
    });

    test("should return 404 if ingredient is not found", async () => {
        const ingredientId = "nonexistent-id"; // Replace with a non-existent ingredient ID

        const response = await request(app).get(`/ingredient/${ingredientId}`).expect(404);

        // Verify the response body structure and error message
        expect(response.body).toHaveProperty("error", "Ingredient not found");
    });
});

// Add more test cases for other ingredient routes if required




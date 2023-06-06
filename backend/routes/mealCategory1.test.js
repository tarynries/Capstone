const request = require("supertest");
const app = require("../app");
const MealCategory = require("../models/mealCategory");
const { NotFoundError } = require("../expressError");


const mockMealCategories = [
    { mealCategoryId: 1, name: "Category 1" },
    { mealCategoryId: 2, name: "Category 2" },
    // Add more mock meal categories as needed
];

const mockMealCategory = { mealCategoryId: 1, name: "Category 1" };

jest.mock("../models/mealCategory");

describe("GET /mealCategory", () => {
    test("should return a list of all meal categories", async () => {
        MealCategory.getAll.mockResolvedValue(mockMealCategories);

        const response = await request(app).get('/mealCategory');

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ mealCategories: mockMealCategories });
        expect(MealCategory.getAll).toHaveBeenCalledTimes(1);
    });

    test("should handle errors and pass them to the error handler middleware", async () => {
        const errorMessage = "Something went wrong";
        MealCategory.getAll.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).get('/mealCategory');

        expect(response.statusCode).toEqual(500);
        expect(response.body).toEqual({
            error: { message: errorMessage, status: 500 },
        });
    });
});

describe("GET /mealCategory/:id", () => {
    test("should return a specific meal category by its ID", async () => {
        const mealCategoryId = 1;
        MealCategory.getById.mockResolvedValue(mockMealCategory);

        const response = await request(app).get(`/mealCategory/${mealCategoryId}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ mealCategory: mockMealCategory });
        expect(MealCategory.getById).toHaveBeenCalledTimes(1);
        expect(MealCategory.getById).toHaveBeenCalledWith(mealCategoryId);
    });

    test("should return 404 if the meal category is not found", async () => {
        const mealCategoryId = 100;
        const errorMessage = `Meal category not found with ID: ${mealCategoryId}`;
        MealCategory.getById.mockRejectedValue(new NotFoundError(errorMessage));

        const response = await request(app).get(`/mealCategory/${mealCategoryId}`);

        expect(response.statusCode).toEqual(404);
        expect(response.body).toEqual({ error: { message: 'Not Found', status: 404 } });
        expect(MealCategory.getById).toHaveBeenCalledTimes(1);
        expect(MealCategory.getById).toHaveBeenCalledWith(mealCategoryId);
    });

    test("should handle errors and pass them to the error handler middleware", async () => {
        const mealCategoryId = 1;
        const errorMessage = "Something went wrong";
        MealCategory.getById.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).get(`/mealCategory/${mealCategoryId}`);

        expect(response.statusCode).toEqual(500);
        expect(response.body).toEqual({
            error: { message: errorMessage, status: 500 },
        });
    });
});


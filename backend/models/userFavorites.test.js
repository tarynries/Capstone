const db = require('../db');
const {
    NotFoundError,
    BadRequestError,
} = require('../expressError');
const UserFavorite = require('./userFavorites');

beforeAll(async function () {
    // Set up any necessary data before running the tests
    await db.query('DELETE FROM user_favorites');

    // Add some initial favorite recipes for testing
    await UserFavorite.addToFavorites(1, 1);
    await UserFavorite.addToFavorites(2, 2);

    const favorites = await db.query('SELECT * FROM user_favorites');
    console.log('Favorites:', favorites.rows);
});

afterAll(async function () {
    await db.query('DELETE FROM user_favorites');
    // Clean up any data created during the tests
});

describe('addToFavorites', function () {
    // test('should add a recipe to a user\'s favorites', async function () {
    //     const userId = 1;
    //     const recipeId = 1;

    //     const favorite = await UserFavorite.addToFavorites(userId, recipeId);

    //     expect(favorite.user_id).toBe(userId);
    //     expect(favorite.recipe_id).toBe(recipeId);
    // });
    test('should add a recipe to a user\'s favorites', async function () {
        const userId = 1;
        const recipeId = 3;

        const favorite = await UserFavorite.addToFavorites(userId, recipeId);

        expect(favorite.user_id).toBe(userId);
        expect(favorite.recipe_id).toBe(recipeId);
    });

    test('should throw a BadRequestError if the user already has the recipe in their favorites', async function () {
        const userId = 1;
        const recipeId = 1;

        await expect(UserFavorite.addToFavorites(userId, recipeId)).rejects.toThrowError(
            BadRequestError
        );
    });
});

describe('getAllFavorites', function () {
    test('should get all favorite recipes for a user', async function () {
        const userId = 1;

        console.log('Before querying favorites');
        const favorites = await UserFavorite.getAllFavorites(userId);
        console.log('Favorites:', favorites);

        expect(favorites.length).toBeGreaterThan(0);
        expect(favorites[0]).toHaveProperty('user_id', userId);
    });
});

describe('removeFromFavorites', function () {
    test('should remove a recipe from a user\'s favorites', async function () {
        const userId = 1;
        const recipeId = 1;

        await UserFavorite.removeFromFavorites(userId, recipeId);

        // Ensure the recipe is removed by trying to fetch it again
        await expect(
            UserFavorite.getAllFavorites(userId)
        ).resolves.not.toEqual(expect.arrayContaining([{ recipe_id: recipeId }]));
    });

    test('should throw a NotFoundError if the user does not have the recipe in their favorites', async function () {
        const userId = 1;
        const recipeId = 1;

        await expect(UserFavorite.removeFromFavorites(userId, recipeId)).rejects.toThrowError(
            NotFoundError
        );
    });
});



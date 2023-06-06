"use strict";

const db = require("../db");
const User = require("../models/user");
const MealCategory = require("../models/mealCategory");
const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients");
const RecipeIngredientMapping = require("../models/recipeIngredient");
const ShoppingList = require("../models/shoppingList");
const ShoppingListItem = require("../models/shoppingListItem");
const UserFavorite = require("../models/userFavorites");
const { createToken } = require("../helpers/tokens");

const testUserData = {
    username: "testuser",
    password: "testpassword",
    email: "testuser@example.com",
};

const testMealCategoryData = {
    name: "Test Meal Category",
};

const testRecipeData = {
    title: "Test Recipe",
    description: "This is a test recipe",
    image_url: "http://example.com/test-recipe.jpg",
};

const testIngredientData = {
    name: "Test Ingredient",
    description: "This is a test ingredient",
};

const testRecipeIngredientMappingData = {
    quantity: "2 cups",
};

const testShoppingListData = {
    name: "Test Shopping List",
};

const testShoppingListItemData = {
    quantity: "3 units",
    checked: false,
};

const testUserFavoriteData = {
    user_id: 23, // Replace with a valid user ID
    recipe_id: 53, // Replace with a valid recipe ID
};

async function commonBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM meal_categories");
    await db.query("DELETE FROM recipes");
    await db.query("DELETE FROM ingredients");
    await db.query("DELETE FROM recipe_ingredient_mapping");
    await db.query("DELETE FROM shopping_lists");
    await db.query("DELETE FROM shopping_list_items");
    await db.query("DELETE FROM user_favorites");

    await User.register(testUserData);

    const mealCategory = await MealCategory.create(testMealCategoryData);
    const recipe = await Recipe.create({
        ...testRecipeData,
        meal_category_id: mealCategory.meal_category_id,
    });
    const ingredient = await Ingredient.create(testIngredientData);
    await RecipeIngredientMapping.create({
        ...testRecipeIngredientMappingData,
        recipe_id: recipe.recipe_id,
        ingredient_id: ingredient.ingredient_id,
    });
    await ShoppingList.create(testShoppingListData);
    await ShoppingListItem.create({
        ...testShoppingListItemData,
        list_id: 24, // Replace with a valid shopping list ID
        ingredient_id: ingredient.ingredient_id,
    });
    await UserFavorite.create(testUserFavoriteData);
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}

const testUserToken = createToken({ username: testUserData.username });

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testUserToken,
};

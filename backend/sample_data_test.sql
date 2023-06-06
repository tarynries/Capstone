-- Insert sample data for users
INSERT INTO users (username, password, email)
VALUES ('user1', 'password1', 'user1@example.com'),
       ('user2', 'password2', 'user2@example.com'),
       ('user3', 'password3', 'user3@example.com');

-- Insert sample data for meal categories
INSERT INTO meal_categories (name)
VALUES ('Breakfast'),
       ('Lunch'),
       ('Dinner');

-- Insert sample data for recipes
INSERT INTO recipes (title, description, image_url, meal_category_id)
VALUES ('Recipe 1', 'Description for Recipe 1', 'image1.jpg', 1),
       ('Recipe 2', 'Description for Recipe 2', 'image2.jpg', 2),
       ('Recipe 3', 'Description for Recipe 3', 'image3.jpg', 3);

-- Insert sample data for ingredients
INSERT INTO ingredients (name, description)
VALUES ('Ingredient 1', 'Description for Ingredient 1'),
       ('Ingredient 2', 'Description for Ingredient 2'),
       ('Ingredient 3', 'Description for Ingredient 3');

-- Insert sample data for recipe-ingredient mapping
INSERT INTO recipe_ingredient_mapping (recipe_id, ingredient_id, quantity)
VALUES (1, 1, '100g'),
       (1, 2, '2 cups'),
       (2, 2, '1 cup'),
       (2, 3, '1 tsp'),
       (3, 1, '200g'),
       (3, 3, '2 tsp');

-- Insert sample data for shopping lists
INSERT INTO shopping_lists (user_id, name)
VALUES (1, 'List 1'),
       (1, 'List 2'),
       (2, 'List 3');

-- Insert sample data for shopping list items
INSERT INTO shopping_list_items (list_id, ingredient_id, quantity, checked)
VALUES (1, 1, '100g', false),
       (1, 2, '2 cups', true),
       (2, 1, '200g', false),
       (2, 3, '2 tsp', true),
       (3, 2, '1 cup', true),
       (3, 3, '1 tsp', false);

-- Insert sample data for user favorites
INSERT INTO user_favorites (user_id, recipe_id)
VALUES (1, 1),
       (1, 3),
       (2, 2);
 
     

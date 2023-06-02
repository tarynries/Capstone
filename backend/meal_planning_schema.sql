CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password VARCHAR(25),
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE meal_categories (
  meal_category_id SERIAL PRIMARY KEY,
  name  VARCHAR(25)
);

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY,
  title VARCHAR(25),
  description TEXT NOT NULL,
  image_url VARCHAR(255),
  meal_category_id INTEGER REFERENCES meal_categories(meal_category_id)
);


CREATE TABLE ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  name  VARCHAR(25),
  description TEXT
);

CREATE TABLE recipe_ingredient_mapping (
  recipe_id INTEGER REFERENCES recipes(recipe_id),
  ingredient_id INTEGER REFERENCES ingredients(ingredient_id),
  quantity VARCHAR(25),
  PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE shopping_lists (
  list_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  name  VARCHAR(25)
);

CREATE TABLE shopping_list_items (
  item_id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES shopping_lists(list_id),
  ingredient_id INTEGER REFERENCES ingredients(ingredient_id),
  quantity VARCHAR(25),
  checked BOOLEAN
);

CREATE TABLE  user_favorites (
  user_id INTEGER REFERENCES users(user_id),
  recipe_id INTEGER REFERENCES recipes(recipe_id),
  PRIMARY KEY (user_id, recipe_id)
);


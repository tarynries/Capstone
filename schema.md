               ┌───────────────────────────┐
               │           User            │
               ├───────────────────────────┤
               │ + user_id (PK)             │
               │   username                │
               │   password                │
               │   email                   │
               └───────────────────────────┘
                          │
                          │
                          ▼
               ┌───────────────────────────┐
               │          Recipe           │
               ├───────────────────────────┤
               │ + recipe_id (PK)          │
               │   title                   │
               │   description             │
               │   meal_category_id (FK)   │
               └───────────────────────────┘
                          │
                          │
                          ▼
        ┌───────────────────────────────┐
        │        Meal Category           │
        ├───────────────────────────────┤
        │ + meal_category_id (PK)        │
        │   name                         │
        └───────────────────────────────┘
                          │
                          │
                          ▼
        ┌───────────────────────────────┐
        │          Ingredient            │
        ├───────────────────────────────┤
        │ + ingredient_id (PK)           │
        │   name                         │
        │   description                  │
        └───────────────────────────────┘
                          │
                          │
                          ▼
        ┌───────────────────────────────┐
        │   Recipe-Ingredient Mapping    │
        ├───────────────────────────────┤
        │ + recipe_id (FK)               │
        │ + ingredient_id (FK)           │
        │   quantity                     │
        └───────────────────────────────┘
                          │
                          │
                          ▼
        ┌───────────────────────────────┐
        │        Shopping List           │
        ├───────────────────────────────┤
        │ + list_id (PK)                 │
        │   user_id (FK)                 │
        │   name                         │
        └───────────────────────────────┘
                          │
                          │
                          ▼
        ┌───────────────────────────────┐
        │      Shopping List Item        │
        ├───────────────────────────────┤
        │ + item_id (PK)                 │
        │   list_id (FK)                 │
        │   ingredient_id (FK)           │
        │   quantity                     │
        │   checked                      │
        └───────────────────────────────┘

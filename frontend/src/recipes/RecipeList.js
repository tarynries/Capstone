import React, { useState, useEffect } from "react";
import RecipeDetail from "./RecipeDetail";
import SearchForm from "../common/SearchForm";

function RecipeList({ recipes }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Function to handle the search term change
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Filter the recipes based on the search term
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <h2>Recipes</h2>
            <h3>Search Meal Categories and Intollerances</h3>
            <SearchForm searchFor={handleSearch} /> {/* Render the SearchForm component */}
            {filteredRecipes.map((recipe) => (
                <RecipeDetail key={recipe.recipe_id} recipe={recipe} />
            ))}
        </div>
    );
}

export default RecipeList;

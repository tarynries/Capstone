import React from "react";

function RecipeDetail({ recipe }) {
    return (
        <div>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.title} />
        </div>
    );
}

export default RecipeDetail;

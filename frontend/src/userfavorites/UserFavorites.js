import React, { useState, useEffect } from "react";

//am I going to need to create ingredients file and 
// import that here for the shopping lists and details?

function UserFavorites({ recipes }) {
    return (
        <div>
            <h2>User Favorites</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserFavorites;
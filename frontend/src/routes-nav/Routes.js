import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Redirect, useNavigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import RecipeList from "../recipes/RecipeList";
import ShoppingList from "../shoppingList/ShoppingList";
import RecipeDetail from "../recipes/RecipeDetail";
import UserFavorites from "../userfavorites/UserFavorites";
import PrivateRoute from "./PrivateRoute";
import EvolutionApi from "../api/api"
import axios from "axios";

/** Site-wide routes.
 *
 */



function AppRoutes({ login, signup }) {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );

    useEffect(() => {
        fetchRecipes();
    }, []);

    async function fetchRecipes() {
        try {
            const response = await axios.get("http://localhost:3001/recipes");
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    async function handleSignUp(formData) {
        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate("/"); // Navigate to the desired route after successful signup
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    }

    return (

        // need to edit this piece 
        <div className="pt-5">

            <Routes>

                <Route path="*" element={<Homepage />} ></Route>

                <Route path="/login" element={<LoginForm login={login} />} ></Route>

                <Route path="/signup" element={<SignUpForm handleSignUp={handleSignUp} />} ></Route>

                <Route path="/recipes" element={<RecipeList recipes={recipes} />} ></Route>

                <Route path="/recipes/:recipeId" element={<RecipeDetail recipes={recipes} />} ></Route>

                <Route path="/shopping" element={<ShoppingList />}></Route>

                <Route path="/favorites" element={<UserFavorites />}></Route>

                <Route path="*" element={() => {
                    navigate("/");
                    return null;
                }} ></Route>
            </Routes>



        </div>
    );
}

export default AppRoutes;
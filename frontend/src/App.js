import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AppRoutes from "./routes-nav/Routes";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import EvolutionApi from "./api/api"
import jwt_decode from "jwt-decode";


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "evolution-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    if (currentUser) {
      // If the user is logged in, fetch their info
      getCurrentUser();
    }
  }, [currentUser]);

  async function login(formData) {
    try {
      const token = await EvolutionApi.login(formData);

      // Set the token in local storage
      setToken(token);

      // Decode the token to get the user information
      const decodedToken = jwt_decode(token);
      const user = decodedToken.payload;

      // Set the current user if the login is successful
      setCurrentUser(user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }


  // Logout function
  async function logout() {
    try {
      // Make an API request to log out the user using EvolutionApi.logout method
      await EvolutionApi.logout();

      // Clear the token from local storage
      setToken(null);

      // Clear the current user state
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  // Signup function
  async function signup(formData) {
    try {
      const token = await EvolutionApi.signup(formData);

      // Set the token in local storage
      setToken(token);

      // Decode the token to get the user information
      const decodedToken = jwt_decode(token);
      const user = decodedToken.payload;

      // Set the current user if the signup is successful
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  // Get current user function
  async function getCurrentUser() {
    try {
      // Make an API request to get the current user info using EvolutionApi.getCurrentUser method
      const user = await EvolutionApi.getCurrentUser();

      // Set the current user if the user is logged in
      setCurrentUser(user);
    } catch (error) {
      console.error("Error getting current user:", error);
    }
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <Routes>
          <Route exact path="*" element={<AppRoutes login={login} signup={signup} logout={logout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;



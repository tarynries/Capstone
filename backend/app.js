"use strict";

// need to change all of this once I add routes 

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
// const authRoutes = require("./routes/auth");
const ingredientRoutes = require("./routes/ingredients");
const mealCategoryRoutes = require("./routes/mealCategory")
const recipeIngredientRoutes = require("./routes/recipeIngredient");
const recipeRoutes = require("./routes/recipes");
const shoppingListRoutes = require("./routes/shoppingList");
const shoppingListItemRoutes = require("./routes/shoppingListItem");
const userRoutes = require("./routes/user");
const userFavoritesRoutes = require("./routes/userFavorites");


const morgan = require("morgan");

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});

// let allowedOrigins = [
//   "https://oceanic-receipt.surge.sh",
//   "http://localhost:3000",
//   "https://jobly12.herokuapp.com",
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         // If a specific origin isn’t found on the list of allowed origins
//         let message =
//           "The CORS policy for this application doesn’t allow access from origin " +
//           origin;
//         return callback(new Error(message), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// app.use("/auth", authRoutes);
app.use("/ingredients", ingredientRoutes)
app.use("/mealCategory", mealCategoryRoutes);
app.use("/recipeIngredient", recipeIngredientRoutes);
app.use("/recipes", recipeRoutes);
app.use("/shoppingList", shoppingListRoutes);
app.use("/shoppingListItem", shoppingListItemRoutes);
app.use("/user", userRoutes);
app.use("/userFavorites", userFavoritesRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
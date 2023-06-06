"use strict";

/** Shared config for application; can be required many places. */

// require("dotenv").config();
require('dotenv').config({ path: './.env' });

require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "evolution123";

const PORT = +process.env.PORT || 3001;


// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? process.env.DATABASE_URL_TEST || "meal_planning_test"
        : process.env.DATABASE_URL || "meal_planning";
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);
// function getDatabaseUri() {
//     if (process.env.NODE_ENV === "test") {
//         return process.env.TEST_DATABASE_URL || "meal_planning_test";
//     }
//     return process.env.DATABASE_URL || "meal_planning";
// }


// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Meal Planning Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};
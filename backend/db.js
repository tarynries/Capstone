
"use strict";
/** Database setup for meal_planning. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    db = new Client({
        connectionString: getDatabaseUri()
    });
}

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1); // Exit the process with a non-zero status code
    } else {
        console.log("Connected to the database");
        console.log("db:", db);
    }
});

module.exports = db;

// "use strict";
// /** Database setup for meal_planning. */
// const { Client } = require("pg");
// const { getDatabaseUri } = require("./config");

// let db;

// if (process.env.NODE_ENV === "production") {
//     db = new Client({
//         connectionString: getDatabaseUri(),
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
// } else {
//     db = new Client({
//         connectionString: getDatabaseUri()
//     });
// }

// db.connect();

// db.execute = async function (text, params) {
//     if (!db) {
//         throw new Error("The database connection is not established.");
//     }

//     return db.query(text, params);
// };

// db.disconnect = function () {
//     if (db) {
//         db.end();
//     }
// };
// module.exports = db;
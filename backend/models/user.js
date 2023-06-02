const db = require("../db");
const bcrypt = require("bcrypt");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
    /** authenticate user with username, password.
     *
     * Returns { username, first_name, last_name, email, is_admin }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/

    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                  password,
                  email
           FROM users
           WHERE username = $1`,
            [username],
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data.
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Throws BadRequestError on duplicates.
 **/

    static async register(
        { username, password, email, }) {
        const duplicateCheck = await db.query(
            `SELECT username
         FROM users
         WHERE username = $1`,
            [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
         (username,
          password,
          email)
         VALUES ($1, $2, $3)
         RETURNING username, email,`,
            [
                username,
                hashedPassword,
                email,
            ],
        );

        const user = result.rows[0];

        return user;
    }

    /** Find all users.
 *
 * Returns [{ username, first_name, last_name, email, is_admin }, ...]
 **/

    static async findAll() {
        const result = await db.query(
            `SELECT username,
                  email,
           FROM users
           ORDER BY username`,
        );

        return result.rows;
    }

    /** Delete given user from database; returns undefined. */

    static async remove(username) {
        let result = await db.query(
            `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
            [username],
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);
    }



}

module.exports = User;
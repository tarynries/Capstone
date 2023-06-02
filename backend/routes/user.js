"use strict";

const jsonschema = require("jsonschema");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userSchema = require("../schemas/user.json");


const router = express.Router();

/** POST /users/ { user }  => { user, token }
 *
 * Register a new user. Returns the newly created user and an authentication token for them.
 *
 * Authorization: none
 **/

router.post("/", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

/** GET /users/ => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns a list of all users.
 *
 * Authorization required: logged-in user
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const users = await User.findAll();
        return res.json({ users });
    } catch (err) {
        return next(err);
    }
});

/** GET /users/:username => { user }
 *
 * Returns the user with the specified username.
 *
 * Authorization required: logged-in user
 **/

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** PATCH /users/:username { user } => { user }
 *
 * Update a user's information. Returns the updated user.
 *
 * Authorization required: logged-in user
 **/

router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.update(req.params.username, req.body);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /users/:username => { deleted: username }
 *
 * Delete a user.
 *
 * Authorization required: logged-in user
 **/

router.delete("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
        await User.remove(req.params.username);
        return res.json({ deleted: req.params.username });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

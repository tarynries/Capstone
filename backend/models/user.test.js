const db = require("../db");
const bcrypt = require("bcrypt");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");
const User = require("./user");

beforeAll(async function () {



    await User.register({
        username: "user1",
        password: "password1",
        email: "user1@example.com"
    });

});

afterAll(async function () {
    // Clean up any data created during the tests
});

describe("authenticate", function () {
    test("should authenticate a user with username and password", async function () {
        const username = "user3";
        const password = "password3";
        const email = "user3@example.com";

        const user = await User.authenticate(username, password);

        expect(user.username).toBe(username);
        // expect(user.email).toBe("testuser@example.com");
        expect(user.email).toBe(email);
    });

    test("should throw an UnauthorizedError if user is not found", async function () {
        const username = "nonexistentuser";
        const password = "testpassword";

        await expect(User.authenticate(username, password)).rejects.toThrowError(
            UnauthorizedError
        );
    });

    test("should throw an UnauthorizedError if password is incorrect", async function () {
        const username = "testuser";
        const password = "incorrectpassword";

        await expect(User.authenticate(username, password)).rejects.toThrowError(
            UnauthorizedError
        );
    });
});

describe("register", function () {
    test("should register a new user", async function () {
        const username = "newuser";
        const password = "newpassword";
        const email = "newuser@example.com";

        const user = await User.register({ username, password, email });

        expect(user.username).toBe(username);
        expect(user.email).toBe(email);
    });

    test("should throw a BadRequestError if username is duplicate", async function () {
        const username = "testuser";
        const password = "newpassword";
        const email = "newuser@example.com";

        await expect(
            User.register({ username, password, email })
        ).rejects.toThrowError(BadRequestError);
    });
});

describe("findAll", function () {
    test("should find all users", async function () {
        const users = await User.findAll();

        expect(users.length).toBeGreaterThanOrEqual(1); // Update the assertion
    });
});

describe("remove", function () {
    test("should remove a user from the database", async function () {
        const username = "user1";

        await User.remove(username);

        // Ensure the user is removed by trying to fetch it again
        await expect(User.authenticate(username, "password1")).rejects.toThrowError(
            UnauthorizedError
        );
    });

    test("should throw a NotFoundError if the user is not found", async function () {
        const username = "nonexistentuser";

        await expect(User.remove(username)).rejects.toThrowError(NotFoundError);
    });
});

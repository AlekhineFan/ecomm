const { check } = require("express-validator");
const users = require("../../repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await users.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email address is already in use");
      }
    })
    .withMessage("Please provide a valid email"),
  requirePassword: check("password").trim().isLength({ min: 4, max: 20 }),
  requirePasswordConfirmed: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must match");
      }
    }),
};

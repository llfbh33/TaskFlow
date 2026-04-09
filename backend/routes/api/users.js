const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validations');

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Provide a valid email.")
    .bail()
    .custom(async (email) => {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("Email is already taken.");
      }
    }),

  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Username is required.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("Provide a username with at least 4 characters.")
    .bail()
    .not()
    .isEmail()
    .withMessage("Username cannot be an email.")
    .bail()
    .custom(async (username) => {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        throw new Error("Username is already taken.");
      }
    }),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),

  handleValidationErrors,
];


// Sign up
router.post('/', validateSignup,  async (req, res) => {
      const { name, username, email, isEmployed, password} = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ name, username, email, status: 'user', isEmployed, hashedPassword });

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        status: user.status,
        isEmployed: user.isEmployed,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );


module.exports = router;

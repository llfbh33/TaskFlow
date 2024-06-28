const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post('/', async (req, res) => {
      const { name, username, email, isEmployed, password} = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ name, username, email, status: 'user', isEmployed, hashedPassword });

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        status: 'user',
        isEmployed: user.isEmployed,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );


module.exports = router;

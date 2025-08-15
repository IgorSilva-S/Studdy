const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../utils/bcrypt')
const { generateToken, verifyToken } = require('../utils/jwt')
const { authenticateToken } = require('../middlewares/jwt')
const { neueSchema, upUserSchema, loginSchema } = require('../schemas/users')

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Creating user
router.post('/neue', async (req, res) => {
  try {
    const { name, email, password } = neueSchema.parse(req.body);

    // Checking existance
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return res.status(403).json({ message: "Usuário já existente" })
    }

    // Crypto password
    const cp = await hashPassword(password)

    const neue = await prisma.user.create({
      data: {
        name,
        email,
        password: cp,
        isDeleted: false
      }
    })

    delete neue.password

    res.status(200).json({ message: "Usuário criado com sucesso", user: neue })
  } catch (err) {
    res.status(400).json({ message: err})
  }
})

/* GET users listing. */
router.get('/a', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

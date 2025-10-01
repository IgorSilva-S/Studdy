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
    res.status(400).json({ message: err })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await prisma.user.findUnique({ where: { email } })
    if (user && !user.isDeleted) {
      let okPassword = await comparePassword(password, user.password)
      if (!okPassword) {
        return res.status(401).json({ message: 'email ou senha não encontrados' })
      }

      const tkn = generateToken({ id: user.id, email: user.email, name: user.name})

      delete user.password

      return res.status(200).json({ message: `Welcome User ${user.name}`, data: user, token: tkn})
    } else {
      return res.status(401).json({ message: 'email ou senha não encontrados' })
    }
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.get('/user', authenticateToken, async (req, res) => {
  res.status(200).json({ message: `Hi ${req.user.name}`, data: req.user})
})

router.put('/edits/:id', async (req, res) => {
  try {
    let { id } = req.params
    id = Number(id)
    const { name, email, password } = upUserSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { id } })
    if (existingUser) {
      let existingEmail = await prisma.user.findUnique({ where: { email } })
      if (existingEmail && email !== existingUser.email) {
        return res.status(403).json({ message: 'Já tem um usuário cadastrado com esse email' })
      }

      let cp
      try {
        cp = await hashPassword(password);
      } catch {
        console.log('No password inserted')
        cp = existingUser.password;
      }
      const editedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: cp
        }
      })

      delete editedUser.password

      return res.status(201).json({ message: 'Usuário atualizado com sucesso', user: editedUser })
    } else {
      return res.status(404).json({ message: 'Não foi possível encontrar o usuário' })
    }
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.delete('/del/:id/:style', async (req, res) => {
  try {
    let { id } = req.params
    const { style } = req.params
    id = Number(id)
    let userExists = await prisma.user.findUnique({ where: { id } })
    if (!userExists) {
      return res.status(404).json({ message: 'Usuário não existe' })
    }
    if (style.toLocaleLowerCase() == 'hard') {
      await prisma.user.delete({
        where: { id }
      })
    } else {
      await prisma.user.update({
        where: { id },
        data: {
          isDeleted: true
        }
      })
    }

    res.sendStatus(204)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.get('/devkeys/getOne/:id', async (req, res) => {
  try {
    let { id } = req.params
    id = Number(id)
    let user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }
    delete user.password
    return res.status(200).json({ user: user })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
})

router.get('/devkeys/getAll', async (req, res) => {
  try {
    let allUser = await prisma.user.findMany()
    allUser.forEach((e) => {
      delete e.password
    })

    return res.status(200).json({ users: allUser })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
})

router.delete('/devkeys/undelete/:id', async (req, res) => {
  try {
    let { id } = req.params
    id = Number(id)
    let user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return res.status(404).json({ message: 'Usuário já deletado com Hard ou Nunca feito' })
    }
    if (!user.isDeleted) {
      return res.status(202).json({ message: 'Não há necessidade de desdeletar um usuário que não está deletado' })
    }
    let restoreUser = await prisma.user.update({
      where: { id },
      data: {
        isDeleted: false
      }
    })

    delete restoreUser.password

    return res.status(201).json({ message: 'Usuário desdeletado com sucesso', user: restoreUser })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
})

module.exports = router;

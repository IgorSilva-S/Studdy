const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/jwt')

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/newTodo', authenticateToken, async (req, res) => {
    try {
        const { marker } = req.body
        const uId = req.user.id
        const tododed = await prisma.markers.create({
            data: {
                marker,
                isMarked: false,
                User_id: uId,
                isDeleted: false
            }
        })

        return res.status(201).json({ message: 'Afazer adicionado', todo: tododed })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.get('/getTodos', authenticateToken, async (req, res) => {
    try {
        const uId = req.user.id
        let todos = await prisma.markers.findMany({ where: { User_id: uId } })
        todos.forEach((todo) => {
            if (todo.isDeleted) {
                let index = todos.indexOf(todo)
                if (index > -1) {
                    todos.splice(index, 1)
                }
            }
        })

        return res.status(200).json({ todos: todos })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.put('/editTodo/:id', async (req, res) => {
    try {
        const { marker } = req.body
        let { id } = req.params
        id = Number(id)

        let tododed = await prisma.markers.update({
            where: { id },
            data: {
                marker
            }
        })

        return res.status(200).json({ message: 'Afazer atualizado', todo: tododed })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.put('/markTodo/:id', async (req, res) => {
    try {
        let { id } = req.params
        id = Number(id)

        let todo = await prisma.markers.findUnique({ where: { id } })
        if (!todo.isMarked) {
            todo = await prisma.markers.update({
                where: { id },
                data: {
                    isMarked: true
                }
            })
        } else {
            todo = await prisma.markers.update({
                where: { id },
                data: {
                    isMarked: false
                }
            })
        }
        return res.status(200).json({ message: 'Afazer atualizado', todo: todo })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.delete('/delTodo/:id/:type', async (req, res) => {
    try {
        const { type } = req.params
        let { id } = req.params
        id = Number(id)

        if (type.toLocaleLowerCase() == 'hard') {
            await prisma.markers.delete({ where: { id } })
        } else {
            await prisma.markers.update({
                where: { id },
                data: {
                    isDeleted: true
                }
            })
        }

        return res.sendStatus(204)
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.get('/devkeys/getAll', async (req, res) => {
    try {
        const todos = await prisma.markers.findMany()

        return res.status(200).json({ todos: todos })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.delete('/devkeys/undelete/:id', async (req, res) => {
    try {
        let { id } = req.params
        id = Number(id)

        let todo = await prisma.markers.findUnique({ where: { id } })
        if (!todo.isDeleted) {
            return res.status(202).json({ message: 'Não há necessidade de desdeletar um afazer que não está deletado' })
        }

        const untodo = await prisma.markers.update({
            where: { id },
            data: {
                isDeleted: false
            }
        })

        return res.status(201).json({ message: 'Afazer desdeletado', todo: untodo })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

module.exports = router
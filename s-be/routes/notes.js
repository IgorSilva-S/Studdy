const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/jwt')

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/newNote', authenticateToken, async (req, res) => {
    try {
        const { notename, note } = req.body
        const uId = req.user.id
        const noted = await prisma.notes.create({
            data: {
                notename,
                note,
                User_id: uId,
                isDeleted: false
            }
        })

        return res.status(201).json({ message: 'Nota adicionada', note: noted })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.get('/getNotes', authenticateToken, async (req, res) => {
    try {
        const uId = req.user.id
        let notes = await prisma.notes.findMany({ where: {User_id: uId}})
        notes.forEach((note) => {
            if (note.isDeleted) {
                let index = notes.indexOf(note)
                if (index > -1) {
                    notes.splice(index, 1)
                }
            }
        })

        return res.status(200).json({ notes: notes})
    } catch (err) {
        return res.status(400).json({ message: err})
    }
})

router.put('/editNote/:id', async (req, res) => {
    try {
        const { notename, note } = req.body
        let { id } = req.params
        id = Number(id)

        let noted = await prisma.notes.update({
            where: { id },
            data: {
                notename,
                note
            }
        })

        return res.status(200).json({ message: 'Nota atualizada', note: noted })
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.delete('/delNote/:id/:type', async (req, res) => {
    try {
        const { type } = req.params
        let { id } = req.params
        id = Number(id)

        if (type.toLocaleLowerCase() == 'hard') {
            await prisma.notes.delete({ where: { id } })
        } else {
            await prisma.notes.update({
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
        const notes = await prisma.notes.findMany()

        return res.status(200).json({ notes: notes})
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

router.delete('/devkeys/undelete/:id', async (req, res) => {
    try {
        let { id } = req.params
        id = Number(id)

        let note = await prisma.notes.findUnique({ where: {id}})
        if (!note.isDeleted) {
            return res.status(202).json({ message: 'Não há necessidade de desdeletar uma nota que não está deletada'})
        }

        const unNote = await prisma.notes.update({
            where: { id },
            data: {
                isDeleted: false
            }
        })

        return res.status(201).json({ message: 'Nota desdeletada', note: unNote})
    } catch (err) {
        return res.status(400).json({ message: err })
    }
})

module.exports = router
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

        return res.status(201).json({ message: 'Added note', note: noted })
    } catch (err) {
        return res.status(400).json({ message: 'Error' })
    }
})

module.exports = router
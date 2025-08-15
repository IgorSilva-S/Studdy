const { z } = require('zod')

const neueSchema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100)
})

const loginSchema = z.object({
  email: z.string().min(1).max(100),
  password: z.string().min(8).max(100),
});

const upUserSchema = neueSchema.pick({
  name: true,
  password: true,
  email: true
}).partial()

module.exports = { neueSchema, loginSchema, upUserSchema }
import express from 'express'
import router from './routes'
import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000
const prisma = new PrismaClient()
app.use((req, res, next) => {
	// res.header('Cross-Origin-Embedder-Policy', '*')
	// res.header('Cross-Origin-Opener-Policy', '*')
	res.header('Access-Control-Allow-Origin', '*')
	next()
})
app.use(cors())
app.use(
	session({
		secret: process.env.COOKIE_SECRET!,
		resave: false,
		saveUninitialized: false,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000,
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined
		})
	})
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => console.log('App Listening'))

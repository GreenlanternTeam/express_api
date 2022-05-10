import { User } from '@prisma/client'
import { Session } from 'express-session'

declare module 'express-session' {
	export interface SessionData {
		user: User
		loggedIn: boolean
	}
	export interface Session {
		user: User
		loggedIn: boolean
	}
}

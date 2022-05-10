import { Request, Response } from 'express'
import prisma from '../lib/prisma'
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

export const getUsers = async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({})
	return res.json({ success: true, users })
}

export const postLogin = async (req: Request | any, res: Response) => {
	const {
		body: { userId, password }
	} = req

	const user = await prisma.user.findUnique({ where: { userId } })
	if (!user) {
		return res.status(400).json({ success: false, message: '아이디가 존재하지 않습니다.' })
	}

	const ok = await bcrypt.compare(password, user.password)
	if (!ok) {
		return res.status(400).json({ success: false, message: '비밀번호가 일치하지 않습니다. ' })
	}
	req.session.loggedIn = true
	req.session.user = user
	return res.status(200).json({ success: true, user })
}

export const postSignup = async (req: Request | any, res: Response) => {
	const {
		body: { userId, email, password }
	} = req

	try {
		const existEmail = await prisma.user.findUnique({ where: { email }, rejectOnNotFound: false })
		const existUserId = await prisma.user.findFirst({ where: { userId }, rejectOnNotFound: false })

		if (existEmail) {
			return res.status(500).json({ success: false, message: '존재하는 이메일 입니다.' })
		}
		if (existUserId) {
			return res.status(500).json({ success: false, message: '존재하는 아이디 입니다.' })
		}

		const hashedPassword = await bcrypt.hash(password, +process.env.SALT!)

		const query: Prisma.UserCreateInput = { userId, email, password: hashedPassword }

		const user = await prisma.user.create({ data: { ...query } })
		return res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		return res.status(400).json({ success: false, message: '알수없는 오류.' })
	}
}

import { NextFunction, Request, Response } from 'express'

const local = (req: Request, res: Response, next: NextFunction) => {
	res.locals.loggedIn = !!req.session.loggedIn
	res.locals.user = req.session.user
}

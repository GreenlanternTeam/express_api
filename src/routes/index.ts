import { postLogin } from './../controller/userController'
import express from 'express'
import { getUsers, postSignup } from '../controller/userController'

const router = express.Router()

router.get('/', getUsers)
router.post('/signup', postSignup)
router.post('/login', postLogin)
export default router

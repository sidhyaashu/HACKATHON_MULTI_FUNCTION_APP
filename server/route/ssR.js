import { Router } from 'express'
const router = Router()
import ss from '../controllers/takeSsC.js'

router.post('/take-screenshot',ss)


export default router
import { Router } from 'express'
const router = Router()
import data from '../controllers/genDataC.js'

router.post('/generate-data',data)


export default router
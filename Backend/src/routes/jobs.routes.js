import { Router } from "express"
import { altaTrabajador,CreateSession,loginUser,Logout,RegisterUser,trabajos } from "../controllers/jobs.controllers.js"

const jobsRoutes = Router()

jobsRoutes.get('/jobs/',trabajos)

jobsRoutes.post('/jobs/', altaTrabajador)

jobsRoutes.post('/registerUser', RegisterUser)

jobsRoutes.get('/session', CreateSession)

jobsRoutes.post('/login',loginUser)

jobsRoutes.post('/logout', Logout)

export { jobsRoutes};
import express, { json } from "express";
import cors from "cors";
import { jobsRoutes } from "./routes/jobs.routes.js";
import { SessionConfig, PORT } from "./config.js";
import path from 'path';
import session from 'express-session';


const app = express();
const __dirname = path.resolve();

app.use(json());
app.use(cors({
    origin: [
        'http://localhost:5173', // Frontend con Vite
        'http://localhost:3000',
        'http://localhost:5500',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Permitir el envío de cookies
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use(session(SessionConfig));


app.use(jobsRoutes);

app.listen(3000, () => {
    console.log("El servidor está corriendo en la ruta http://localhost:3000");
});

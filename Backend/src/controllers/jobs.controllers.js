import { newConex } from "../db/db.js";

export const trabajos = async (req, res) => {
    try {
        const conex = await newConex();
        const [trabajadores] = await conex.query('SELECT * FROM `trabajadores`');
        res.status(200).json(trabajadores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error a la hora de traer los trabajadores' });
    }
}


export const altaTrabajador = async (req, res) => {
    const { id_servicio, experiencia, disponibilidad, valoracion_promedio } = req.body;
    try {
        const conex = await newConex();
        await conex.query('INSERT INTO `trabajadores`(`id_servicio`, `experiencia`, `disponibilidad`, `valoracion_promedio`) VALUES (?, ?, ?, ?)', [id_servicio, experiencia, disponibilidad, valoracion_promedio]);
        res.status(201).json({ message: 'La tarea se creó correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al crear la tarea' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const conex = await newConex();
        const [user] = await conex.execute('SELECT * FROM usuarios WHERE nombre = ? AND contraseña = ?', [username, password]);

        if (user.length > 0) {
            // Guardar información del usuario en la sesión
            req.session.userId = user[0].id;
            req.session.username = user[0].nombre;
            return res.status(200).json({ message: 'Inicio de sesión exitoso', user: user[0] });
        } else {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const RegisterUser = async (req, res) => {
    const { username, correo, password, telefono } = req.body
    try {
        const conex = await newConex()

        const [userExist] = await conex.execute('SELECT id FROM usuarios WHERE nombre = ?', [username])
        if (userExist.length > 0) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        const [consulta] = await conex.execute('INSERT INTO usuarios (nombre, correo, contraseña, telefono) VALUES (?,?,?,?)', [username, correo, password, telefono])

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }

};

export const CreateSession = async (req, res) => {
    try {

        if (req.session.userId) {
            return res.json({
                loggedIn: true,
                user: { id: req.session.userId, username: req.session.username }
            });
        } else {
            return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
        }

    } catch {

    }
};

export const Logout = async (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
};


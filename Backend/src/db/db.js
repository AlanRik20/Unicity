import { createConnection } from "mysql2/promise";

const newConex = async () => {
    try {
        const conex = await createConnection({
            host: "localhost",
            user: "root",
            database: "unicity"
        });
        console.log("Conexión exitosa");
        return conex;
    } catch (error) {
        throw error;
    }
};

export {
    newConex
};
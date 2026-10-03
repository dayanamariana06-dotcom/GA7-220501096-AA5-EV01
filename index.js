// Importamos Express para crear nuestro servicio web
const express = require("express");

// Creamos la aplicación de Express
const app = express();

// Definimos el puerto donde funcionará el servicio
const PORT = 3000;

// Permite que el servicio pueda recibir información en formato JSON
app.use(express.json());

// Array temporal donde se almacenarán los usuarios registrados
// Para este caso académico se utiliza una memoria temporal.
const usuarios = [];

// ---------------------------------------------------------
// RUTA PRINCIPAL
// ---------------------------------------------------------

// Permite comprobar que el servicio web está funcionando
app.get("/", (req, res) => {
    res.json({
        mensaje: "Servicio web de registro e inicio de sesión funcionando correctamente"
    });
});

// ---------------------------------------------------------
// SERVICIO DE REGISTRO
// ---------------------------------------------------------

// Recibe un usuario y una contraseña para registrar un nuevo usuario
app.post("/registro", (req, res) => {

    // Extraemos los datos enviados por el cliente
    const { usuario, contraseña } = req.body;

    // Validamos que se hayan enviado ambos datos
    if (!usuario || !contraseña) {
        return res.status(400).json({
            error: "El usuario y la contraseña son obligatorios"
        });
    }

    // Verificamos si el usuario ya se encuentra registrado
    const usuarioExistente = usuarios.find(
        (u) => u.usuario === usuario
    );

    if (usuarioExistente) {
        return res.status(409).json({
            error: "El usuario ya está registrado"
        });
    }

    // Guardamos el nuevo usuario
    usuarios.push({
        usuario: usuario,
        contraseña: contraseña
    });

    // Respondemos indicando que el registro fue exitoso
    res.status(201).json({
        mensaje: "Usuario registrado correctamente"
    });
});

// ---------------------------------------------------------
// SERVICIO DE INICIO DE SESIÓN
// ---------------------------------------------------------

// Recibe un usuario y una contraseña para realizar la autenticación
app.post("/login", (req, res) => {

    // Extraemos los datos enviados por el cliente
    const { usuario, contraseña } = req.body;

    // Validamos que se hayan enviado ambos datos
    if (!usuario || !contraseña) {
        return res.status(400).json({
            error: "El usuario y la contraseña son obligatorios"
        });
    }

    // Buscamos un usuario que coincida con los datos enviados
    const usuarioEncontrado = usuarios.find(
        (u) =>
            u.usuario === usuario &&
            u.contraseña === contraseña
    );

    // Si no encontramos coincidencia, la autenticación falla
    if (!usuarioEncontrado) {
        return res.status(401).json({
            error: "Error en la autenticación"
        });
    }

    // Si los datos son correctos, informamos que la autenticación fue exitosa
    res.json({
        mensaje: "Autenticación satisfactoria"
    });
});

// ---------------------------------------------------------
// INICIAR EL SERVICIO WEB
// ---------------------------------------------------------

// Ponemos el servidor a escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servicio web ejecutándose en http://localhost:${PORT}`);
});
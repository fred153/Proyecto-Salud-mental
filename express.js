const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = 3000;

// Crear cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth() // Mantiene la sesión sin escanear QR cada vez
});

// Mostrar el código QR en la terminal
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea este código QR con tu WhatsApp');
});

// Evento que se dispara cuando WhatsApp está listo
client.on('ready', () => {
    console.log('WhatsApp Web está listo!');
});

// Objeto para almacenar estados de usuarios
let estadosUsuarios = {};

// Listas de información
const lista_de_definicion = {
    "ansiedad": "Es una respuesta natural del cuerpo ante situaciones de estrés o peligro. \nSe caracteriza por sentimientos de preocupación, nerviosismo o miedo, y \np puede manifestarse tanto a nivel físico como emocional."
};

const lista_de_sintomas = {
    "ansiedad": [
        "Palpitaciones o aceleración del corazón",
        "Sudoración excesiva",
        "Tensión muscular",
        "Fatiga o debilidad",
        "Dificultad para respirar o sensación de ahogo",
        "Mareos o aturdimiento",
        "Náuseas o problemas gastrointestinales"
    ]
};

// Función para saludar al usuario
function saludarUsuario(msg) {
    msg.reply('Hola soy tu asistente virtual y voy a ayudarte a entender mejor las enfermedades del sistema nervioso. \nIntroduce el nombre de la enfermedad:');
}

// Función para manejar mensajes
function manejarMensaje(msg) {
    const usuarioId = msg.from;
    const mensaje = msg.body.trim().toLowerCase();

    // Ignorar los mensajes vacíos
    if (mensaje === '') return;

    // Inicializar estado si no existe
    if (!estadosUsuarios[usuarioId]) {
        estadosUsuarios[usuarioId] = 'inicio'; // Inicializa el estado del usuario
    }

    evaluarRespuesta(msg, estadosUsuarios[usuarioId], usuarioId); // Llama a la función y pasa el estado actual
}

// Función para evaluar la respuesta del usuario
function evaluarRespuesta(msg, estado, usuarioId) {
    const enfermedadConsultada = msg.body.toLowerCase().trim(); // Obtener la enfermedad consultada y normalizarla

    switch (estado) {
        case 'inicio':
            saludarUsuario(msg);
            estadosUsuarios[usuarioId] = 'esperando_enfermedad'; // Cambia el estado
            break;

        case 'esperando_enfermedad':
            if (lista_de_definicion[enfermedadConsultada]) {
                const definicion = lista_de_definicion[enfermedadConsultada];
                const sintomas = lista_de_sintomas[enfermedadConsultada].join(', ');

                msg.reply(`**Definición de ${enfermedadConsultada}:**\n${definicion}\n\nAhora que ya sabemos qué es la ${enfermedadConsultada}, veremos algunos síntomas:\n${sintomas}\n\n¿Entendiste? Responde "sí" o "no".`);
                estadosUsuarios[usuarioId] = 'evaluando_entendimiento'; // Cambia el estado
            } else {
                msg.reply('Lo siento, no tengo información sobre esa enfermedad. Por favor, intenta con otra.');
            }
            break;

        case 'evaluando_entendimiento':
            if (msg.body.toLowerCase() === 'sí') {
                msg.reply('¡Genial! ¿Quieres un ejemplo de cómo se presenta la ansiedad en la vida real? Responde "sí" o "no".');
                estadosUsuarios[usuarioId] = 'preguntando_ejemplo'; // Nueva etapa
            } else if (msg.body.toLowerCase() === 'no') {
                msg.reply('Entiendo. Aquí tienes un enlace para más información: [enlace]');
                estadosUsuarios[usuarioId] = 'fin'; // Finaliza la interacción
            } else {
                msg.reply('No entiendo tu respuesta. Responde "sí" o "no".');
            }
            break;

        case 'preguntando_ejemplo':
            if (msg.body.toLowerCase() === 'sí') {
                msg.reply('Aquí tienes un ejemplo: María, de 28 años, siente ansiedad antes de las reuniones en su trabajo.');
                estadosUsuarios[usuarioId] = 'evaluando_nuevo_ejemplo';
            } else if (msg.body.toLowerCase() === 'no') {
                msg.reply('Entiendo, si necesitas más información, no dudes en preguntar. Aquí tienes un video que puede ayudarte: [video]');
                estadosUsuarios[usuarioId] = 'fin';
            }
            break;

        case 'evaluando_nuevo_ejemplo':
            msg.reply('¿Te gustaría otro ejemplo? Responde "sí" o "no".');
            estadosUsuarios[usuarioId] = 'decidiendo_ejemplo'; // Nueva etapa
            break;

        case 'decidiendo_ejemplo':
            if (msg.body.toLowerCase() === 'sí') {
                msg.reply('Aquí tienes otro ejemplo: Pedro, de 34 años, siente ansiedad al hablar en público.');
            } else if (msg.body.toLowerCase() === 'no') {
                msg.reply('Entiendo, aquí tienes un enlace para más información: [enlace]');
                estadosUsuarios[usuarioId] = 'fin';
            }
            break;

        case 'fin':
            msg.reply('Gracias por usar el asistente. Si necesitas más ayuda, no dudes en preguntar.');
            delete estadosUsuarios[usuarioId]; // Borra el estado del usuario
            break;

        default:
            msg.reply('No entiendo tu respuesta, por favor intenta nuevamente.');
            break;
    }
}

// Evento para recibir mensajes de WhatsApp
client.on('message', manejarMensaje);

// Iniciar el cliente de WhatsApp
client.initialize();

// Servir archivos estáticos (HTML)
app.use(express.static('public'));

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

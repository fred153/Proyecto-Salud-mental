<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página con Cuadro de Mensajes y Envío</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #FFD1DC, #FFB6C1, #FFC0CB, #FF69B4); /* colores del fondo*/
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
            position: relative;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .relieve {
            width: 60%;
            height: 300px;
            padding: 20px;
            background-color: #FFD1DC;
            border-radius: 20px;
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2),
                        -10px -10px 20px rgba(255, 255, 255, 0.6),
                        inset 10px 10px 20px rgba(0, 0, 0, 0.2),
                        inset -10px -10px 20px rgba(255, 255, 255, 0.6); /* colores del fondo*/
            text-align: center;
            font-family: 'Arial', sans-serif;
            color: #333;
            font-size: 24px;
            position: relative;
        }

        .mensaje {
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.8); /* Fondo translúcido */
            border-radius: 15px;
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2),
                        -5px -5px 15px rgba(255, 255, 255, 0.5);
            font-size: 18px;
            font-weight: bold;
        }

        .mensaje-container {
    position: absolute;
    max-height: 1000px; /* Altura máxima para el cuadro de mensajes */
    width: 500px;
    overflow-y: auto; /* Desplazamiento vertical si hay más mensajes */
    padding: 10px;
    text-align: left; /* Alineación de texto a la izquierda */
}

        .mensaje-usuario {
            padding: 10px;
            background-color: #FFC0CB; /* Color claro para el usuario */
            border-radius: 10px;
            margin-bottom: 10px;
            display: inline-block;
            max-width: 80%;
            text-align: right;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            float: right; /* Alineación a la derecha */
            clear: both; /* Evita que los mensajes se apilen mal */
        }

        .mensaje-respuesta {
            padding: 10px;
            background-color: #FF69B4; /* Color más oscuro para la respuesta */
            border-radius: 10px;
            margin-bottom: 10px;
            display: inline-block;
            max-width: 80%;
            text-align: left;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            float: left; /* Alineación a la izquierda */
            clear: both; /* Evita que los mensajes se apilen mal */
        }

        /* Cuadro de texto y botón de envío */
        .input-container {
            position: absolute;
            bottom: 20px;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .input-container input[type="text"] {
            width: 80%;
            padding: 10px;
            font-size: 18px;
            border: 2px solid #FFB6C1;
            border-radius: 10px;
            box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1),
                        inset -5px -5px 10px rgba(255, 255, 255, 0.5);
            outline: none;
        }

        .input-container button {
            padding: 10px 20px;
            margin-left: 10px;
            font-size: 18px;
            background-color: #FF69B4;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2),
                        -5px -5px 10px rgba(255, 255, 255, 0.5);
            transition: background-color 0.3s;
        }

        .input-container button:hover {
            background-color: #FF1493;
        }
    </style>
</head>
<body>
    <div class="relieve">
        <div class="mensaje-container" id="mensajeContainer">
            <!-- Los mensajes enviados aparecerán aquí -->
        </div>
    </div>

    <!-- Contenedor de cuadro de texto y botón de envío -->
    <div class="input-container">
        <input type="text" id="mensajeInput" placeholder="Escribe tu mensaje aquí...">
        <button onclick="enviarMensaje()">Enviar</button>
    </div>

    <script>
        import copy

SIMBOLO_JUGADOR = 'X'
SIMBOLO_MAQUINA = 'O'

def crear_malla_vacia():
    return [[" " for _ in range(3)] for _ in range(3)]

def gano_maquina(malla):
    for i in range(3):
        if all(malla[i][j] == SIMBOLO_MAQUINA for j in range(3)):
            return True
        if all(malla[j][i] == SIMBOLO_MAQUINA for j in range(3)):
            return True
    if all(malla[i][i] == SIMBOLO_MAQUINA for i in range(3)):
        return True
    if all(malla[i][2 - i] == SIMBOLO_MAQUINA for i in range(3)):
        return True
    return False

def verificar_ganador(malla):
    for jugador in [SIMBOLO_JUGADOR, SIMBOLO_MAQUINA]:
        for i in range(3):
            if all(malla[i][j] == jugador for j in range(3)) or all(malla[j][i] == jugador for j in range(3)):
                return jugador
        if all(malla[i][i] == jugador for i in range(3)) or all(malla[i][2 - i] == jugador for i in range(3)):
            return jugador
    return None

class Nodo:
    def __init__(self, malla, jugador, nivel=0):
        self.malla = malla
        self.jugador = jugador  # último jugador que hizo jugada
        self.nivel = nivel
        self.hijos = []
        self.gano_maquina = gano_maquina(malla)
        self.ganador = verificar_ganador(malla)

def generar_hijos(nodo):
    if nodo.gano_maquina or nodo.ganador is not None:
        return
    if not any(" " in fila for fila in nodo.malla):
        return

    siguiente_jugador = SIMBOLO_MAQUINA if nodo.jugador == SIMBOLO_JUGADOR else SIMBOLO_JUGADOR

    for i in range(3):
        for j in range(3):
            if nodo.malla[i][j] == " ":
                nueva_malla = copy.deepcopy(nodo.malla)
                nueva_malla[i][j] = siguiente_jugador
                hijo = Nodo(nueva_malla, siguiente_jugador, nodo.nivel + 1)
                nodo.hijos.append(hijo)

def minimax(nodo, es_turno_maquina):
    if nodo.gano_maquina:
        return 1
    elif nodo.ganador == SIMBOLO_JUGADOR:
        return -1
    elif not any(" " in fila for fila in nodo.malla):
        return 0

    generar_hijos(nodo)

    if es_turno_maquina:
        mejor_valor = -float('inf')
        for hijo in nodo.hijos:
            valor = minimax(hijo, False)
            if valor > mejor_valor:
                mejor_valor = valor
        return mejor_valor
    else:
        peor_valor = float('inf')
        for hijo in nodo.hijos:
            valor = minimax(hijo, True)
            if valor < peor_valor:
                peor_valor = valor
        return peor_valor

def elegir_mejor_jugada(nodo_actual):
    generar_hijos(nodo_actual)
    mejor_valor = -float('inf')
    mejor_jugada = None

    for hijo in nodo_actual.hijos:
        valor = minimax(hijo, False)
        if valor > mejor_valor:
            mejor_valor = valor
            mejor_jugada = hijo

    return mejor_jugada

def imprimir_malla(malla):
    for fila in malla:
        print(" | ".join(c if c != " " else "_" for c in fila))
    print()

def jugar():
    nodo_actual = Nodo(crear_malla_vacia(), SIMBOLO_MAQUINA)  # Inicial: máquina no ha jugado aún (por eso pongo SIMBOLO_MAQUINA, para que siguiente sea jugador)
    while True:
        imprimir_malla(nodo_actual.malla)

        if nodo_actual.ganador == SIMBOLO_JUGADOR:
            print("¡Ganaste! 🎉")
            break
        elif nodo_actual.ganador == SIMBOLO_MAQUINA:
            print("La máquina ganó. 💻")
            break
        elif not any(" " in fila for fila in nodo_actual.malla):
            print("Empate.")
            break

        # Turno jugador
        print("Tu turno. Ingresa fila y columna (0, 1 o 2) separados por espacio:")
        try:
            fila, col = map(int, input().split())
        except:
            print("Entrada inválida, intenta de nuevo.")
            continue

        if fila not in [0,1,2] or col not in [0,1,2]:
            print("Valores fuera de rango, intenta de nuevo.")
            continue
        if nodo_actual.malla[fila][col] != " ":
            print("Casilla ocupada, intenta de nuevo.")
            continue

        nueva_malla = copy.deepcopy(nodo_actual.malla)
        nueva_malla[fila][col] = SIMBOLO_JUGADOR
        nodo_actual = Nodo(nueva_malla, SIMBOLO_JUGADOR, nodo_actual.nivel +1)

        # Verificar si jugador ganó antes de que juegue máquina
        if nodo_actual.ganador == SIMBOLO_JUGADOR:
            imprimir_malla(nodo_actual.malla)
            print("¡Ganaste! 🎉")
            break

        # Turno máquina
        print("Turno de la máquina...")
        nodo_actual = elegir_mejor_jugada(nodo_actual)

        if nodo_actual is None:
            print("Empate")
            break

        if nodo_actual.ganador == SIMBOLO_MAQUINA:
            imprimir_malla(nodo_actual.malla)
            print("La máquina ganó. 💻")
            break

jugar()

    </script>
</body>
</html>

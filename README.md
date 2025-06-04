<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Tres en raya</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
    }
    table {
      margin: 20px auto;
      border-collapse: collapse;
    }
    td {
      width: 60px;
      height: 60px;
      border: 2px solid #333;
      font-size: 36px;
      cursor: pointer;
      vertical-align: middle;
      text-align: center;
    }
    button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>Tateti (Tic Tac Toe) JS</h1>
  
  <table id="tablero">
    <!-- Aquí se genera el tablero dinámicamente -->
  </table>
  
  <button id="reiniciar">Reiniciar Juego</button>

  <script>
    const SIMBOLO_JUGADOR = 'X';
    const SIMBOLO_MAQUINA = 'O';

    let tablero = [];
    let turnoJugador = true;  // true: jugador, false: máquina

    // Crear tablero vacío
    function crearTableroVacio() {
      tablero = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ];
    }

    // Dibujar tablero en la tabla HTML
    function dibujarTablero() {
      const tabla = document.getElementById('tablero');
      tabla.innerHTML = '';
      for(let i=0; i<3; i++) {
        const fila = document.createElement('tr');
        for(let j=0; j<3; j++) {
          const celda = document.createElement('td');
          celda.textContent = tablero[i][j] === ' ' ? '' : tablero[i][j];
          celda.dataset.fila = i;
          celda.dataset.columna = j;
          celda.addEventListener('click', manejarClick);
          fila.appendChild(celda);
        }
        tabla.appendChild(fila);
      }
    }

    // Manejar click del jugador
    function manejarClick(event) {
      if (!turnoJugador) return; // No es turno del jugador
      const fila = parseInt(event.target.dataset.fila);
      const columna = parseInt(event.target.dataset.columna);

      if (tablero[fila][columna] !== ' ') {
        alert('Casilla ocupada, elige otra.');
        return;
      }

      tablero[fila][columna] = SIMBOLO_JUGADOR;
      turnoJugador = false;
      dibujarTablero();

      if (verificarGanador(tablero, SIMBOLO_JUGADOR)) {
        alert('¡Ganaste!');
        return;
      }

      if (tableroLlena()) {
        alert('Empate.');
        return;
      }

      setTimeout(jugadaMaquina, 500);
    }

    // Verificar ganador (simplificado para un solo símbolo)
    function verificarGanador(malla, simbolo) {
      // filas, columnas, diagonales
      for(let i=0; i<3; i++) {
        if (malla[i].every(c => c === simbolo)) return true;
        if ([malla[0][i], malla[1][i], malla[2][i]].every(c => c === simbolo)) return true;
      }
      if ([malla[0][0], malla[1][1], malla[2][2]].every(c => c === simbolo)) return true;
      if ([malla[0][2], malla[1][1], malla[2][0]].every(c => c === simbolo)) return true;
      return false;
    }

    // Revisar si tablero lleno
    function tableroLlena() {
      return tablero.flat().every(c => c !== ' ');
    }

    // Jugada simple de la máquina (elige la primera casilla vacía)
    function jugadaMaquina() {
      for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
          if (tablero[i][j] === ' ') {
            tablero[i][j] = SIMBOLO_MAQUINA;
            dibujarTablero();
            if (verificarGanador(tablero, SIMBOLO_MAQUINA)) {
              alert('¡Gana la máquina!');
            }
            turnoJugador = true;
            return;
          }
        }
      }
      alert('Empate.');
      turnoJugador = true;
    }

    // Reiniciar juego
    document.getElementById('reiniciar').addEventListener('click', () => {
      crearTableroVacio();
      turnoJugador = true;
      dibujarTablero();
    });

    // Inicializar
    crearTableroVacio();
    dibujarTablero();
  </script>
</body>
</html>

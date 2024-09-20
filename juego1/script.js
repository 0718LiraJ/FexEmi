const totalCards = 18;
const availableCards = ['images/sist.png', 'images/amb.png', 'images/civ.png', 'images/etn.png', 'images/ind.png', 'images/com.png', 'images/mec.png', 'images/pet.png', 'images/agro.png'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';
let gameStarted = false; // Controlar si el juego ha comenzado

let remainingTime = 90; // Tiempo inicial en segundos (1 minuto y 30 segundos)
let timerInterval;
let score = 0; // Variable para almacenar el puntaje
let matchedPairs = 0; // Contador para las parejas de cartas que coinciden
const totalPairs = totalCards / 2; // Número total de parejas a coincidir

// Función para actualizar el cronómetro en cuenta regresiva
function updateTimer() {
   const minutes = Math.floor(remainingTime / 60);
   const seconds = remainingTime % 60;
   document.querySelector('#time').innerHTML = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

   if (remainingTime > 0) {
      remainingTime--; // Reducir el tiempo en 1 segundo
   } else {
      endGame(); // Llamar a la función de fin de juego si se acaba el tiempo
   }
}

// Función para iniciar el cronómetro
function startTimer() {
   timerInterval = setInterval(updateTimer, 1000); // Actualiza cada segundo
}

// Función para actualizar el puntaje
function updateScore() {
   score += 10; // Incrementar el puntaje por 10
   document.querySelector('#score').innerHTML = `Puntaje: ${score}`;
   return score;
}

// Función para terminar el juego
function endGame() {
   clearInterval(timerInterval); // Detener el cronómetro
   document.querySelector('#game').style.display = 'none'; // Ocultar el juego
   document.querySelector('#stats').style.display = 'none'; // Ocultar el cronómetro
   document.querySelector('#endgameForm').style.display = 'flex'; // Mostrar el formulario de fin del juego
   document.querySelector('#finalScore').innerHTML = `Puntaje: ${score}`; // Mostrar el puntaje final
}

// Mostrar todas las cartas durante 2 segundos después de un retraso inicial
function revealAllCards() {
   setTimeout(() => {
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(card => {
         card.classList.add('active'); // Mostrar todas las cartas
      });

      // Ocultar las cartas después de 2 segundos
      setTimeout(() => {
         allCards.forEach(card => {
            card.classList.remove('active'); // Ocultar todas las cartas
         });
         gameStarted = true; // Marcar que el juego puede comenzar ahora
      }, 2000); // Esperar 2 segundos
   }, 1000); // Esperar 2 segundos antes de revelar las cartas
}

// Función para generar las cartas mezcladas
function generateCards() {
   cards = []; // Reiniciar el array de cartas
   valuesUsed = []; // Reiniciar los valores usados para evitar duplicados
   document.querySelector('#game').innerHTML = ''; // Limpiar el área de juego

   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);
      randomValue();
      cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
      cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
   }

   // Revelar todas las cartas al inicio después de un retraso
   revealAllCards();
}

// Función para obtener un valor aleatorio para las cartas
function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   } else {
      randomValue();
   }
}

// Función para obtener el contenido de la cara de la carta
function getFaceValue(value) {
   let rtn = value;
   if (value < availableCards.length) {
      rtn = `<img src="${availableCards[value]}" alt="Carta" style="width:100%; height:auto;">`;
   }
   return rtn;
}

// Función para manejar la activación de cartas
function activate(e) {
   if (!gameStarted) return; // No permitir activar cartas hasta que el juego haya comenzado

   if (currentMove < 2) {
      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {
            currentAttempts++;
            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               updateScore(); // Incrementar el puntaje si las cartas coinciden
               matchedPairs++; // Incrementar el número de parejas coincididas
               selectedCards = [];
               currentMove = 0;

               // Verificar si todas las parejas fueron coincididas
               if (matchedPairs === totalPairs) {
                  endGame(); // Terminar el juego si todas las cartas coinciden
               }
            } else {
               setTimeout(() => {
                  selectedCards[0].classList.remove('active');
                  selectedCards[1].classList.remove('active');
                  selectedCards = [];
                  currentMove = 0;
               }, 600);
            }
         }
      }
   }
}

// Función para reiniciar el juego
function resetGame() {
   gameStarted = false; // Reiniciar el estado del juego
   currentMove = 0;
   selectedCards = [];
   score = 0; // Reiniciar el puntaje
   matchedPairs = 0; // Reiniciar el contador de parejas

   document.querySelector('#score').innerHTML = `Puntaje: ${score}`;
   document.querySelector('#time').innerHTML = `Tiempo restante: 1:30`;
   document.querySelector('#endgameForm').style.display = 'none';
   document.querySelector('#game').style.display = 'flex';
   document.querySelector('#stats').style.display = 'block';

   // Volver a generar las cartas
   generateCards();

   // Detener cualquier temporizador activo
   clearInterval(timerInterval);
   remainingTime = 90; // Reiniciar el tiempo
}

// Función para iniciar el juego cuando se entra desde el menú
window.onload = () => {
   document.querySelector('#restartButton').addEventListener('click', resetGame);

   // Generar las cartas y revelarlas cuando se carga el juego desde el menú
   generateCards();
};

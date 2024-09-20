const totalCards = 18;
const availableCards = ['images/sist.png', 'images/amb.png', 'images/civ.png', 'images/etn.png', 'images/ind.png', 'images/com.png', 'images/mec.png', 'images/pet.png', 'images/agro.png'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
   if (currentMove < 2) {

      if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
         e.target.classList.add('active');
         selectedCards.push(e.target);

         if (++currentMove == 2) {

            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
               selectedCards = [];
               currentMove = 0;
            }
            else {
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

function randomValue() {
   let rnd = Math.floor(Math.random() * totalCards * 0.5);
   let values = valuesUsed.filter(value => value === rnd);
   if (values.length < 2) {
      valuesUsed.push(rnd);
   }
   else {
      randomValue();
   }
}

function getFaceValue(value) {
   let rtn = value;
   if (value < availableCards.length) {
      rtn = `<img src="${availableCards[value]}" alt="Carta" style="width:100%; height:auto;">`;
   }
   return rtn;
}

for (let i = 0; i < totalCards; i++) {
   let div = document.createElement('div');
   div.innerHTML = cardTemplate;
   cards.push(div);
   document.querySelector('#game').append(cards[i]);
   randomValue();
   cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
   cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
}

let remainingTime = 90; // Tiempo inicial en segundos (1 minuto y 30 segundos)
let timerInterval;
let timerStarted = false; // Bandera para controlar el inicio del cronómetro
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

// Modifica la función 'activate' para manejar el fin de juego cuando se coinciden todas las cartas
function activate(e) {
   // Iniciar el temporizador solo si no ha empezado
   if (!timerStarted) {
      startTimer();
      timerStarted = true; // Marcar el cronómetro como iniciado
   }

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
   remainingTime = 90; // Reiniciar el tiempo a 1:30
   score = 0; // Reiniciar el puntaje
   matchedPairs = 0; // Reiniciar el contador de parejas
   timerStarted = false; // El cronómetro no ha comenzado
   selectedCards = []; // Reiniciar las cartas seleccionadas
   currentMove = 0; // Reiniciar los movimientos

   // Volver a mostrar el área del juego y el cronómetro
   document.querySelector('#game').style.display = 'flex';
   document.querySelector('#stats').style.display = 'block';
   document.querySelector('#endgameForm').style.display = 'none'; // Ocultar el formulario de fin de juego

   // Reiniciar el contenido del puntaje y el cronómetro en la pantalla
   document.querySelector('#score').innerHTML = `Puntaje: ${score}`;
   document.querySelector('#time').innerHTML = `Tiempo restante: 1:30`;

   // Remover las cartas actuales y generar nuevas cartas (mezcladas)
   document.querySelector('#game').innerHTML = ''; // Limpiar el área de juego
   valuesUsed = []; // Reiniciar los valores usados para las cartas
   generateCards(); // Volver a generar las cartas desde cero

   // Reiniciar el temporizador (solo cuando la primera carta se gire)
   clearInterval(timerInterval); // Detener cualquier temporizador anterior
}

// Función para generar las cartas mezcladas
function generateCards() {
   cards = []; // Reiniciar el array de cartas
   for (let i = 0; i < totalCards; i++) {
      let div = document.createElement('div');
      div.innerHTML = cardTemplate;
      cards.push(div);
      document.querySelector('#game').append(cards[i]);
      randomValue();
      cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
      cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
   }
}

// Manejar el clic en el botón de "Volver a jugar"
window.onload = () => {
   document.querySelector('#restartButton').addEventListener('click', () => {
      resetGame(); // Llama a resetGame en lugar de recargar la página
   });
};

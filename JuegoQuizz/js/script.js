const startBtn = document.getElementById('startBtn');
const quizzDiv = document.getElementById('quizz-container');
const menuDiv = document.getElementById('menu');
const questionEl = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const timeEl = document.getElementById('time');
const resultDiv = document.getElementById('result');
const scoreEl = document.getElementById('final-score');
const congratulationsEl = document.getElementById('congratulations');
const restartBtn = document.getElementById('restartBtn');

// Variables para las imágenes
const rankImages = document.getElementById('rank-images');
const leftRankImage = document.getElementById('left-rank-image');
const rightRankImage = document.getElementById('right-rank-image');

// Barra de progreso
const progressBar = document.getElementById('progress-bar');
const resultProgressBar = document.getElementById('result-progress-bar');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 12;
let selectedQuestions = [];

// Preguntas (mantener las mismas preguntas)
let questions = [
    { question: "¿En qué año se fundó Bolivia?", answers: ["1825", "1830", "1809", "1850"], correct: 0 },
    { question: "¿Quién fue el primer presidente de Bolivia?", answers: ["Antonio José de Sucre", "Simón Bolívar", "Andrés de Santa Cruz", "Mariano Melgarejo"], correct: 0 },
    { question: "¿Qué país invadió Bolivia en la Guerra del Chaco?", answers: ["Paraguay", "Brasil", "Argentina", "Perú"], correct: 0 },
    { question: "¿En qué año Bolivia perdió su acceso al mar tras la Guerra del Pacífico?", answers: ["1884", "1879", "1890", "1865"], correct: 0 },
    { question: "¿Cuál fue el resultado del referéndum de autonomía de Bolivia en 2009?", answers: ["Aprobación del proyecto de nueva constitución", "Rechazo total", "Se suspendió", "No tuvo efecto"], correct: 0 },
    { question: "¿Cuál fue el primer país en aterrizar en la luna?", answers: ["Estados Unidos", "Rusia", "China", "Japón"], correct: 0 },
    { question: "¿En qué año terminó la Segunda Guerra Mundial?", answers: ["1945", "1939", "1941", "1948"], correct: 0 },
    { question: "¿Qué país construyó la Gran Muralla?", answers: ["China", "Japón", "Corea del Sur", "India"], correct: 0 },
    { question: "¿Cuál es el río más largo del mundo?", answers: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"], correct: 0 },
    { question: "¿Cuál es el idioma más hablado en el mundo?", answers: ["Chino mandarín", "Inglés", "Español", "Árabe"], correct: 0 },
    { question: "¿En qué continente se encuentra el desierto del Sahara?", answers: ["África", "Asia", "América", "Oceanía"], correct: 0 },
    { question: "¿En qué país se celebraron los primeros Juegos Olímpicos modernos?", answers: ["Grecia", "Francia", "Italia", "Estados Unidos"], correct: 0 },
    { question: "¿Quién fue el descubridor de América?", answers: ["Cristóbal Colón", "Vasco da Gama", "Hernán Cortés", "Fernando de Magallanes"], correct: 0 },
    { question: "¿Qué país es conocido como 'La Tierra del Sol Naciente'?", answers: ["Japón", "China", "Corea del Sur", "India"], correct: 0 },
    { question: "¿Quién escribió la teoría de la relatividad?", answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"], correct: 0 },
    { question: "¿Qué es el teorema de Pitágoras?", answers: ["En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.", "En un triángulo, la suma de los ángulos es siempre 360 grados.", "En un triángulo equilátero, los tres ángulos son iguales.", "El perímetro de un triángulo es la suma de sus tres lados."], correct: 0 },
    { question: "¿Qué es un número primo?", answers: ["Un número divisible solo por 1 y por sí mismo", "Un número divisible por 2", "Un número negativo", "Un número mayor que 10"], correct: 0 },
    { question: "¿Qué es un número racional?", answers: ["Un número que puede expresarse como el cociente de dos enteros.", "Un número que no puede expresarse como fracción de dos enteros.", "Un número que siempre es positivo.", "Un número con parte imaginaria."], correct: 0 },
    { question: "¿Cuál es el valor de pi (π) aproximado a dos decimales?", answers: ["3.14", "2.71", "1.62", "3.41"], correct: 0 },
    { question: "¿Cuál es la raíz cuadrada de 144?", answers: ["12", "14", "16", "10"], correct: 0 },
    { question: "¿Qué significa que dos ángulos son complementarios?", answers: ["Su suma es 90 grados", "Su suma es 180 grados", "Son ángulos iguales", "Son ángulos opuestos"], correct: 0 },
    { question: "¿Qué es un número complejo?", answers: ["Un número con la forma a + bi donde a y b son números reales e i es la raíz cuadrada de -1.", "Un número que siempre es mayor que uno.", "Un número que no tiene representación gráfica.", "Un número que solo existe en la teoría de funciones."], correct: 0 },
    { question: "¿Cuál es el planeta más cercano al Sol?", answers: ["Mercurio", "Venus", "Tierra", "Marte"], correct: 0 },
    { question: "¿Cómo se llama el proceso por el cual las plantas producen oxígeno?", answers: ["Fotosíntesis", "Respiración", "Digestión", "Evaporación"], correct: 0 },
    { question: "¿Cuál es el gas más abundante en la atmósfera de la Tierra?", answers: ["Nitrógeno", "Oxígeno", "Dióxido de carbono", "Hidrógeno"], correct: 0 },
    { question: "¿Cómo se llama la capa más externa de la Tierra?", answers: ["Corteza", "Manto", "Núcleo", "Litosfera"], correct: 0 },
    { question: "¿Qué tipo de sangre es considerado donante universal?", answers: ["O-", "A+", "B+", "AB-"], correct: 0 },
    { question: "¿Qué órgano del cuerpo humano es responsable de bombear la sangre?", answers: ["Corazón", "Pulmón", "Hígado", "Riñón"], correct: 0 },
    { question: "¿Qué metal es líquido a temperatura ambiente?", answers: ["Mercurio", "Hierro", "Aluminio", "Cobre"], correct: 0 },
    { question: "¿Quién formuló las leyes del movimiento?", answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"], correct: 0 }
];

const startQuizz = () => {
    selectedQuestions = selectRandomQuestions();
    menuDiv.classList.add('hidden');
    quizzDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    score = 0; // Resetear el puntaje al iniciar
    progressBar.style.width = '0%'; // Reiniciar barra
    showQuestion();
    startTimer();
};

const startTimer = () => {
    timeLeft = 12;
    timeEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timer);
};

const showQuestion = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    const shuffledAnswers = shuffleArray([...currentQuestion.answers]);

    answersDiv.innerHTML = '';
    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(index, button, currentQuestion.answers.indexOf(answer)));
        answersDiv.appendChild(button);
    });
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const selectAnswer = (index, button, originalIndex) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    stopTimer();

    const allButtons = document.querySelectorAll('.answer-button');
    allButtons.forEach(btn => btn.disabled = true);

    if (originalIndex === currentQuestion.correct) {
        score++;
        button.classList.add('correct');
        
        // Actualizar barra de progreso solo si la respuesta es correcta
        const progressPercentage = (score / selectedQuestions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    } else {
        button.classList.add('incorrect');
        const correctButton = Array.from(allButtons).find(btn => btn.textContent === currentQuestion.answers[currentQuestion.correct]);
        correctButton.classList.add('correct');
    }

    setTimeout(() => {
        showNextQuestion();
    }, 1000);
};

const showNextQuestion = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
        startTimer();
    } else {
        endQuizz();
    }
};

const endQuizz = () => {
    quizzDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    
    // Mostrar el puntaje final en la barra de progreso del resultado
    const finalProgress = (score / selectedQuestions.length) * 100;
    resultProgressBar.style.width = `${finalProgress}%`;

    scoreEl.textContent = `Tu puntaje es: ${score}/${selectedQuestions.length}`;
    showCongratulations();
};

const showCongratulations = () => {
    let message = '';
    const rankContainer = document.getElementById('rank-container');
    const rankImages = document.getElementById('rank-images');
    const leftRankImage = document.getElementById('left-rank-image');
    const rightRankImage = document.getElementById('right-rank-image');
    const progressBar = document.getElementById('progress-bar'); // Para la barra de progreso

    rankContainer.classList.add('hidden');
    rankImages.classList.add('hidden');
    rankContainer.innerHTML = '';

    // Actualiza las imágenes y los mensajes
    if (score === 10) {
        message = "Felicidades General";
        leftRankImage.src = "img/General_Ejercito.png";
        rightRankImage.src = "img/General_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 9) {
        message = "Felicidades Coronel";
        leftRankImage.src = "img/Coronel_Ejercito.png";
        rightRankImage.src = "img/Coronel_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 8) {
        message = "Felicidades Teniente Coronel";
        leftRankImage.src = "img/Teniente_Coronel_Ejercito.png";
        rightRankImage.src = "img/Teniente_Coronel_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 7) {
        message = "Felicidades Mayor";
        leftRankImage.src = "img/Mayor_Ejercito.png";
        rightRankImage.src = "img/Mayor_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 6) {
        message = "Felicidades Capitán";
        leftRankImage.src = "img/Capitan_Ejercito.png";
        rightRankImage.src = "img/Capitan_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 5) {
        message = "Felicidades Teniente";
        leftRankImage.src = "img/Teniente_Ejercito.png";
        rightRankImage.src = "img/Teniente_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 4) {
        message = "Felicidades Sub Teniente";
        leftRankImage.src = "img/Sub_Teniente_Ejercito.png";
        rightRankImage.src = "img/Sub_Teniente_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 3) {
        message = "Felicidades Cabo";
        leftRankImage.src = "img/Cabo_Ejercito.png";
        rightRankImage.src = "img/Cabo_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 2) {
        message = "Felicidades Dragoneante";
        leftRankImage.src = "img/Dragoneante_Ejercito.png";
        rightRankImage.src = "img/Dragoneante_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
    } else if (score === 1) {
        message = "Felicidades Soldado Raso";
        leftRankImage.src = "img/Soldado_Ejercito.png";
        rightRankImage.src = "img/Soldado_Aerea.png";
        rankImages.classList.remove('hidden');
        rankContainer.innerHTML = `
            <div class="circle-container">
                <div class="circle circle-outer"></div>
                <div class="circle circle-middle"></div>
                <div class="circle circle-inner"></div>
            </div>
        `;
        rankContainer.classList.remove('hidden');
    } else {
        message = "¡Sigue intentándolo!";
        leftRankImage.src = "img/rip.png";
        rightRankImage.src = "img/rip.png";
    }

    congratulationsEl.textContent = message;
};

const selectRandomQuestions = () => {
    const shuffled = shuffleArray([...questions]);
    return shuffled.slice(0, 10); 
};

restartBtn.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    resultDiv.classList.add('hidden');
    menuDiv.classList.remove('hidden');
});

startBtn.addEventListener('click', startQuizz);

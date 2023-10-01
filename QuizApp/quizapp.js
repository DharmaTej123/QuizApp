const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which element has the chemical symbol 'H'?",
        options: ["Helium", "Hydrogen", "Lithium", "Neon"],
        correctAnswer: "Hydrogen"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

let timerInterval;
let timeLeft = 10; // Set the initial timer value (in seconds)

function startTimer() {
    timeLeft = 10; // Reset the timer for each question
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            checkAnswer(null); // Automatically submit if time runs out
        }
    }, 1000); // Update the timer every 1 second (1000 milliseconds)
}

function updateTimerDisplay() {
    document.getElementById("timer").textContent = `Time Left: ${timeLeft} seconds`;
}
let isAnswerSelected = false; 
function checkAnswer(selectedOption) {
    clearInterval(timerInterval); // Stop the timer

    const currentQuizQuestion = questions[currentQuestion];
    const feedbackElement = document.createElement("p");
    feedbackElement.classList.add("feedback");

    if (selectedOption === currentQuizQuestion.correctAnswer) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = "Incorrect. The correct answer is: " + currentQuizQuestion.correctAnswer;
        feedbackElement.style.color = "red";
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
        restartButton.style.display = "block";
    }

    answersElement.appendChild(feedbackElement);
    isAnswerSelected = false;
    nextButton.style.display = "block";
    nextButton.disabled = false;
    
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercentage = (currentQuestion / questions.length) * 100;
    progressBar.style.width = progressPercentage + "%";
    if (currentQuestion === questions.length) {
        progressBar.style.width = "100%";
    }
}

function loadQuestion() {
    clearInterval(timerInterval); // Stop the timer for the previous question
    startTimer(); // Start the timer for the current question
    updateProgressBar();
    const currentQuizQuestion = questions[currentQuestion];
    questionElement.textContent = currentQuizQuestion.question;

    answersElement.innerHTML = "";

    currentQuizQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
            checkAnswer(option);
            isAnswerSelected = true; // Track that an answer is selected
        });
        answersElement.appendChild(optionElement);
    });
    // Enable the "Next" button, even if no answer is selected for the current question
    nextButton.style.display = "block";
    nextButton.disabled = false;
}
// Update the "Next" button click event to display the correct answer
nextButton.addEventListener("click", () => {
    const currentQuizQuestion = questions[currentQuestion];
    const feedbackElement = document.createElement("p");
    feedbackElement.classList.add("feedback");
    feedbackElement.textContent = "The correct answer is: " + currentQuizQuestion.correctAnswer;
    feedbackElement.style.color = "red";
    answersElement.appendChild(feedbackElement);
    

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});
function showScore() {
    questionElement.textContent = "Quiz Completed!";
    answersElement.innerHTML = "";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
    scoreElement.textContent = `Your Score: ${score} out of ${questions.length}`;
    updateProgressBar();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    scoreElement.textContent = '';
    nextButton.style.display = "block";
    restartButton.style.display = "none";
}

const restartButton = document.getElementById("restart-btn");
restartButton.addEventListener("click", restartQuiz);

loadQuestion();

// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Saturn", "Venus"],
        answer: "Mars"
    },
    // Add more questions as needed
];

// DOM Elements
const questionNumberText = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options');
const feedbackText = document.getElementById('feedback');
const scoreText = document.getElementById('score');
const timerText = document.getElementById('timer');
const submitBtn = document.getElementById('submit-btn');
const startBtn = document.getElementById('start-btn');
const retestBtn = document.getElementById('retest-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const celebration = document.getElementById('celebration');
const congratsMessage = document.getElementById('congrats-message');

// Quiz Parameters
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // seconds
let timer;
let answers = [];

// Start the quiz
startBtn.addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('scoreboard').style.display = 'none'; // Hide scoreboard initially
    document.getElementById('progress-section').style.display = 'none'; // Hide progress bar initially
    initializeQuiz();
});

// Retest the quiz
retestBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    answers = [];
    document.getElementById('retest').style.display = 'none';
    document.getElementById('scoreboard').style.display = 'none'; // Hide scoreboard initially
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('progress-section').style.display = 'none'; // Hide progress bar initially
    initializeQuiz();
});

// Initialize Quiz
function initializeQuiz() {
    showQuestion();
    startTimer();
}

// Display Question and Options
function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionNumberText.textContent = `Question ${currentQuestionIndex + 1}`;
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsList.innerHTML = '';
    
    // Display options as buttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('btn', 'btn-outline-primary');
        button.addEventListener('click', () => selectOption(option, button));
        optionsList.appendChild(button);
    });
    
    // Reset feedback
    feedbackText.textContent = '';
    
    // Show/Hide buttons
    submitBtn.style.display = currentQuestionIndex === quizData.length - 1 ? 'block' : 'none';
    nextBtn.style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'block';
}

// Option Selection
function selectOption(selectedOption, selectedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    answers[currentQuestionIndex] = selectedOption === currentQuestion.answer;

    // Check if answer is correct
    if (selectedOption === currentQuestion.answer) {
        feedbackText.textContent = 'Correct!';
        feedbackText.classList.remove('text-danger');
        feedbackText.classList.add('text-success');
        selectedButton.classList.remove('btn-outline-primary');
        selectedButton.classList.add('btn-success');
        score++; // Increment score for correct answer
    } else {
        feedbackText.textContent = 'Wrong!';
        feedbackText.classList.remove('text-success');
        feedbackText.classList.add('text-danger');
        selectedButton.classList.remove('btn-outline-primary');
        selectedButton.classList.add('btn-danger');
    }
    
    // Disable all option buttons after selection
    optionsList.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });
}

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    }
});

// Submit Answer
submitBtn.addEventListener('click', () => {
    endQuiz();
});

// Timer Functionality
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    questionNumberText.textContent = 'Quiz Finished!';
    questionText.textContent = '';
    optionsList.innerHTML = '';
    feedbackText.textContent = '';
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    document.getElementById('retest').style.display = 'block';
    document.getElementById('scoreboard').style.display = 'block'; // Show scoreboard
    document.getElementById('progress-section').style.display = 'block'; // Show progress bar
    updateProgressBar();
    triggerCelebration();
}

// Update Progress Bar
function updateProgressBar() {
    const totalQuestions = quizData.length;
    const correctAnswers = answers.filter(answer => answer).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const correctPercentage = (correctAnswers / totalQuestions) * 100;
    const incorrectPercentage = (incorrectAnswers / totalQuestions) * 100;

    progressBar.style.width = '100%';
    progressBar.style.background = `linear-gradient(to right, #4CAF50 ${correctPercentage}%, #f44336 ${correctPercentage + incorrectPercentage}%)`;

    // Update score text
    scoreText.textContent = `${correctAnswers} / ${totalQuestions}`;
}

// Trigger Celebration Effect
function triggerCelebration() {
    if (answers.length === quizData.length && answers.every(answer => answer)) {
        // All answers are correct
        celebration.innerHTML = `
            <div class="celebration-message">Congratulations! You answered all questions correctly!</div>
            <div class="fireworks"></div>
        `;
        celebration.style.display = 'block';
        setTimeout(() => {
            celebration.style.display = 'none';
        }, 7000); // Display for 7 seconds
    } else {
        // Normal celebration
        celebration.innerHTML = `
            <div class="celebration-message">Good job!</div>
        `;
        celebration.style.display = 'block';
        setTimeout(() => {
            celebration.style.display = 'none';
        }, 5000); // Display for 5 seconds
    }
}

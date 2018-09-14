// IIFE function
// esto nos da privacidad en el codigo, de esta manera, si nuestro codigo 
// esta desarrollado para ser un plugin, no interferira con el codigo de otros desarrolladores.
(function (){

// Create constructor functions
var Answer = function(answer, isCorrect) {
    this.answer = answer;
    this.isCorrect = isCorrect;
}

var Question = function(question, answer) {
    if (Array.isArray(answer)) {
        this.question = question;
        this.answer = answer;
    } else {
        return console.log('answer must be an array');
    }
}

// create initialized variables
var q1, q2, q3, questionArray, question, userAnswer, score;

// define the variables
q1 = new Question('How much is 2 + 2?', [
    new Answer(3, false),
    new Answer(4, true)
]);
q2 = new Question('How much is 5 * 5?', [
    new Answer(10, false),
    new Answer(25, true)
]);
q3 = new Question('How much is 3 / 3?', [
    new Answer(0, false),
    new Answer(1, true)
]);

// fill the array of all questions
questionArray = [q1, q2, q3];

// initialize the score.
score = 0;

function randomQuestion() {
    // Math.random()*3 because we have only 3 questions
    question = questionArray[Math.floor(Math.random()*3)];
}

// function to make a question
function makeQuestion(question, answer) {
    console.log('The question is: ' + question);
    console.log('Your possible answers are: ');
    for (var i = 0; i < answer.length; i++) {
        console.log(i + '.- ' + answer[i].answer);
    }
    userAnswer = prompt('Type your answer: ');
}

// function to check if a question is correct
function checkAnswer(answer) {
    if (answer[userAnswer].isCorrect) {
        console.log('Your answer is correct! :D');
        score++;
    } else {
        console.log('Your answer is incorrect! D:');
        if (score > 0) {
            score--;
        }
    }
}

console.log('To finish the game type \'exit\' or \'quit\' ');

// run the code.
while (true) {
    console.log('Score: ' + score);
    randomQuestion();
    makeQuestion(question.question, question.answer);
    if (userAnswer === '' || userAnswer === null) {
        console.log('Your answer can\'t be blank');
    } else if (userAnswer >= question.answer.length) {
        console.log('Your answer must be in the interval offered');
    } else if (userAnswer === 'exit' || userAnswer === 'quit') {
        console.log('Game finished!');
        console.log('Your final score is: ' + score);
        score = 0;
        break;
    } else if (userAnswer < question.answer.length){
        checkAnswer(question.answer);
    } else {
        console.log('Error, enter a valid answer.');
    }
}

// end of the IIFE function
})();
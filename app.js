let secretNumbersList = [];
let limitOfNumbers = 10;
let secretNumber = generateRandonNumber();
let attempts = 1;

function showText(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female');
}

function initialMessage() {
    showText('h1', 'Secret Number Game');
    showText('p', 'Choose a number between 1 and 10:');
}

initialMessage();


function generateRandonNumber() {
    let chosenNumber = parseInt(Math.random() * limitOfNumbers + 1);
    let numberOfElementsInTheList = secretNumbersList.length;

    if (numberOfElementsInTheList == limitOfNumbers) {
        secretNumbersList = [];
    }

    if (secretNumbersList.includes(chosenNumber)) {
        return generateRandonNumber();
    } else {
        secretNumbersList.push(chosenNumber);
        console.log(secretNumbersList);
        return chosenNumber;
    }
};

function verifyGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber) {
        showText('h1', 'Correct!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let attemptMessage = `You guessed the secret number in ${attempts} ${attemptWord}!`
        showText('p', attemptMessage);
        document.getElementById('reload').removeAttribute('disabled');

    } else {
        if (guess > secretNumber) {
            showText('p', 'The secret number is smaller');
        } else {
            showText('p', 'The secret number is bigger');
        }
    }
    attempts++;
    cleanField();
};

function cleanField() {
    guess = document.querySelector('input');
    guess.value = '';
}

function reloadGame() {
    secretNumber = generateRandonNumber();
    cleanField();
    initialMessage();
    attempts = 1;
    document.getElementById('reload').setAttribute('disabled', true);

}
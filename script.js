const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        if (!action) {
            handleNumber(value);
        } else if (action === 'operator') {
            handleOperator(value);
        } else if (action === 'equals') {
            handleEquals();
        } else if (action === 'clear') {
            handleClear();
        }
    });
});

function handleNumber(number) {
    if (currentInput.length >= 16) return;
    if (currentInput === '0' && number === '0') return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay(currentInput);
}

function handleOperator(selectedOperator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        handleEquals();
    }
    operator = selectedOperator;
    previousInput = currentInput;
    currentInput = '';
}

function handleEquals() {
    if (previousInput === '' || currentInput === '') return;
    const result = calculate(previousInput, currentInput, operator);
    updateDisplay(result);
    currentInput = result;
    previousInput = '';
    operator = null;
}

function calculate(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '−':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            return num1 / num2;
        default:
            return b;
    }
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}

function updateDisplay(value) {
    display.textContent = value;
}

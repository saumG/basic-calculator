// ADD function, adds two nums
function add(num1, num2) {
    return num1 + num2;
}

// SUBTRACT funciton, subtracts num2 from num1
function subtract(num1, num2) {
    return num1 - num2;
}

// MULTIPLY function, returns the product of 2 nums
function multiply(num1, num2) {
    return num1 * num2;
}

// DIVIDE function, returns the quotient of 2 nums
function divide (dividend, divisor) {
    return dividend / divisor;
}

//OPERATION FUNCTIONS


function operate(operation) {
    let operator = operation[1];
    if (operator = '+'){
        return add(operation[0], operation[2]);
    } else if (operator = '-'){
        return subtract(operation[0], operation[2]);
    } else if (operator = '*'){
        return multiply(operation[0], operation[2]);
    } else if (operator = '/'){
        return divide(operation[0], operation[2]);
    }
    console.log(`operator ${operator} was not recognized`);
    return;
}

// TODO
let currNum = '';
let currOperator = '';
let equation = [];
let matchOperation = {
    '+':'+',
    '-':'-',
    'x':'*',
    '÷':'/'
}

function updateDisplayNum() {
    valueDisplay.textContent = currNum;
    console.log(`updated display num to ${currNum}`);
}

function updateDisplayEquation() {
    equationDisplay.textContent = equation.join(' ');
    console.log(`updated display eq to ${equationDisplay.textContent}`);
}

function numPressed(button) {
    if (currNum === '0' && button.textContent != '.') {
        currNum = button.textContent;
    } else {
        currNum += button.textContent;
    }

    equation[equation.length - 1] = currNum;
    updateDisplayEquation();
    updateDisplayNum();
}

function operationPressed(button) {
    currOperator = matchOperation[button.textContent];
    if (isOperator(equation[equation.length - 1])) {
        equation[equation.length - 1] = currOperator;
    } else {
        equation.push(currOperator);
        currNum = '0'
    }
    updateDisplayEquation();
}

function isOperator(value) {
    return '+-/*'.includes(value);
}

function cleanEquationLastValue() {
    if (isOperator(equation[equation - 1])) {
        equation.pop()
        return equation;
    }
    return equation;
}

// COMPUTE FUNCTION
function computeEquation(equation) {
    equation = cleanEquationLastValue();

    while (equation.length > 1) {
        if (equation.indexOf('*')) {
            opIdx = equation.indexOf('*');
            operation = equation.slice(opIdx - 1, opIdx + 1);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation = equation.splice(opIdx - 1, 3, result);


        } else if (equation.indexOf('/')){
            opIdx = equation.indexOf('/');
            operation = equation.slice(opIdx - 1, opIdx + 1);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation = equation.splice(opIdx - 1, 3, result);

        } else if (equation.indexOf('+')) {
            opIdx = equation.indexOf('+');
            operation = equation.slice(opIdx - 1, opIdx + 1);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation = equation.splice(opIdx - 1, 3, result);

        } else if (equation.indexOf('-')) {
            opIdx = equation.indexOf('-');
            operation = equation.slice(opIdx - 1, opIdx + 1);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation = equation.splice(opIdx - 1, 3, result);
        }
    }
    //set dispValue to last value in equation;
    valueDisplay.textContent = operation[0];
    equation = [];
    currNum = '';
}

/// clear
/// delete instead of +-
/// round long decimals 
/// display error message when user tries to divide by 0


// DOM CONTENT
numberButtons = document.querySelectorAll('.number');
operationButtons = document.querySelectorAll('.operation');
equalButton = document.getElementById('equal');


clearButton = document.getElementById('clear');
plusMinusButton = document.getElementById('plus-minus');
percentButton = document.getElementById('percent');

equationDisplay = document.querySelector('.equation');
valueDisplay = document.querySelector('.value');

// EVENT LISTENERS
numberButtons.forEach(number => {
    number.addEventListener('click', numPressed(number))
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', operationPressed(operation))
});

equalButton.addEventListener('click', computeEquation(equation));

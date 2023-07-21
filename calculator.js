// ADD function, adds two nums
function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

// SUBTRACT funciton, subtracts num2 from num1
function subtract(num1, num2) {
    console.log(`subtracting`);
    return parseInt(num1) - parseInt(num2);
}

// MULTIPLY function, returns the product of 2 nums
function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

// DIVIDE function, returns the quotient of 2 nums
function divide (dividend, divisor) {
    return parseInt(dividend) / parseInt(divisor);
}

//OPERATION FUNCTIONS


function operate(operation) {
    let operator = operation[1];
    console.log(operator)
    if (operator === '+'){
        return add(operation[0], operation[2]);
    } else if (operator === '-'){
        return subtract(operation[0], operation[2]);
    } else if (operator === '*'){
        return multiply(operation[0], operation[2]);
    } else if (operator === '/'){
        return divide(operation[0], operation[2]);
    }
    console.log(`operator ${operator} was not recognized`);
    return;
}

// TODO
let currNum = '';
let currOperator = '';
let equation = [''];
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
    
    if (isOperator(equation[equation.length - 1])){
        equation.push(currNum);
    } else {
        equation[equation.length - 1] = currNum;
    }
    
    updateDisplayNum();
    updateDisplayEquation();

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
    console.log(`cleaning eq ${equation.join(' ')}`)
    if (isOperator(equation[equation - 1])) {
        equation.pop()
    }
    if (equation[0] === ' '){
        equation.shift();
    }
    return equation;
}

let idxTracker = {
    '+': 0,
    '-': 0,
    '*': 0,
    '/': 0,
}


// COMPUTE FUNCTION
function computeEquation(equation) {
    equation = cleanEquationLastValue();
    console.log(`cleaned eq ${equation.join(' ')}`)

    for (const operator in idxTracker) {
        idxTracker[operator] = equation.indexOf(operator);
    }

    

    while (equation.length > 2) {
        if (equation.indexOf('*') != -1) {
            opIdx = equation.indexOf('*');
            operation = equation.slice(opIdx - 1, opIdx + 2);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation.splice(opIdx - 1, 3, result);

        } else if (equation.indexOf('/')!= -1){
            opIdx = equation.indexOf('/');
            operation = equation.slice(opIdx - 1, opIdx + 2);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation.splice(opIdx - 1, 3, result);

        } else if (equation.indexOf('+')!= -1) {
            opIdx = equation.indexOf('+');
            operation = equation.slice(opIdx - 1, opIdx + 2);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation.splice(opIdx - 1, 3, result);
            console.log(`post splicing... new eq ${equation.join(' ')}`)

        } else if (equation.indexOf('-')!= -1) {
            console.log('subtracting')
            opIdx = equation.indexOf('-');
            operation = equation.slice(opIdx - 1, opIdx + 2);
            console.log(`operating on ${operation.join(' ')}`);
            result = operate(operation);
            console.log(result);
            equation.splice(opIdx - 1, 3, result);
        }
    }
    console.log(`equation length is ${equation.length}`)

    valueDisplay.textContent = equation[equation.length - 1];
    console.log(`value displayed... new eq ${equation.join('_')}`)

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
    number.addEventListener('click', () => {numPressed(number)})
});

operationButtons.forEach(operation => {
    operation.addEventListener('click', () => {operationPressed(operation)})
});

equalButton.addEventListener('click', () =>  {computeEquation(equation)});

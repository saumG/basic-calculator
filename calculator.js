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
let operation = [
    {
        number1: 0,
        operator: '+',
        number2: 0,
    },
]

function operate(operation) {
    let operator = operation.operator;
    if (operator = '+'){
        return add(operation.number1, operation.number2);
    } else if (operator = '-'){
        return subtract(operation.number1, operation.number2);
    } else if (operator = '*'){
        return multiply(operation.number1, operation.number2);
    } else if (operator = '/'){
        return divide(operation.number1, operation.number2);
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

/// updateEquation() --- everytime a button is pressed
function updateEquation(value, isOperation) {
    if (isOperation) {
        equation.append(matchOperation[value]);
    } else {
        equation.append()
    }
}

/// updateDisplayEquation
function updateDisplayEquation() {
    equationDisplay.textContent = equation.join(' ');
    console.log(`updated display eq to ${equationDisplay.textContent}`);
}

// set displayVal to 0
// set displayEq to empty

// number is pressed 
    // if currNum is 0 and pressed button is not .
        // remove char from currNum and add pressed button
    // else... 
        // add button to currNum string
    
    // update last value of equation array to currNum
    //updateDisplayEquation
    //displayVal is currNum

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

// operation is pressed 
    // set operation.operator to matchoperation[button]
    // if last element in eq array is not operator
        // add operator to eq array
        // set currNum to '0'
    // if last element in eq array is an operator
        //replace it with new operator
    
    // updateDisplayEquation
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

    while (equation.length > 1) {

    }
}


/// setOperation --- dict 'x':'*' ..... then switch case for setting the value of operation.operator
/// clear
/// delete instead of +-
/// round long decimals 
/// display error message when user tries to divide by 0




// DOM CONTENT
numberButtons = document.querySelectorAll('.number');

divideButton = document.getElementById('divide');
multiplyButton = document.getElementById('multiply');
subtractButton = document.getElementById('subtract');
addButton = document.getElementById('add');
equalButton = document.getElementById('equal');


clearButton = document.getElementById('clear');
plusMinusButton = document.getElementById('plus-minus');
percentButton = document.getElementById('percent');

equationDisplay = document.querySelector('.equation');
valueDisplay = document.querySelector('.value');

// EVENT LISTENERS

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
/// clear
/// delete instead of +-
/// updateDisplay()
/// updateEquation() --- everytime a button is pressed
/// setOperation --- dict 'x':'*' ..... then switch case for setting the value of operation.operator
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

// EVENT LISTENERS

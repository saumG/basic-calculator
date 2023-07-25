// Setting max number of decimal points
MAX_DECIMAL_POINTS = 8;

// ADD function, adds two nums
function add(num1, num2) {
    return ((parseFloat(num1) + parseFloat(num2)).toFixed(MAX_DECIMAL_POINTS) * 1).toString();
}

// SUBTRACT funciton, subtracts num2 from num1
function subtract(num1, num2) {
    return ((parseFloat(num1) - parseFloat(num2)).toFixed(MAX_DECIMAL_POINTS) * 1).toString();
}

// MULTIPLY function, returns the product of 2 nums
function multiply(num1, num2) {
    return ((parseFloat(num1) * parseFloat(num2)).toFixed(MAX_DECIMAL_POINTS) * 1).toString();
}

// DIVIDE function, returns the quotient of 2 nums
function divide (dividend, divisor) {
    return ((parseFloat(dividend) / parseFloat(divisor)).toFixed(MAX_DECIMAL_POINTS) * 1).toString();
}

//OPERATION FUNCTION
function operate(operation) {
    // operation is an array in the form [first num, operator, second num]
    let operator = operation[1];

    if (operator === '+'){
        return add(operation[0], operation[2]);
    } else if (operator === '-'){
        return subtract(operation[0], operation[2]);
    } else if (operator === '*'){
        return multiply(operation[0], operation[2]);
    } else if (operator === '/'){
        return divide(operation[0], operation[2]);
    }
    //log in the console in case the operator is not recognized
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
    '÷':'/',
}

// Updates the display number in the display on the calculator
function updateDisplayNum() {
    valueDisplay.textContent = currNum;
    console.log(`updated display num to ${currNum}`);
}

// Updates the equation on the display above the normal number on the calculator
function updateDisplayEquation() {
    equationDisplay.textContent = equation.join(' ');
    console.log(`updated display eq to ${equationDisplay.textContent}`);
}

// updates variables and display based on the number pressed (includes 0-9 and a .)
function numPressed(button) {
    if (currNum.includes('.') && button.textContent == '.'){
        return;
    } else if (currNum === '0' && button.textContent != '.') {
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
    console.log(`operation pressed ... eq ${equation.join('_')}`);
    if (equation.length === 1 && isOperator(equation[0])){
        console.log(`equation is only 1 length and has an operator`);
        equation = [''];
    }

    updateDisplayEquation();
}

function isOperator(value) {
    return '+-/*'.includes(value);
}

function cleanEquationLastValue() {
    console.log(`cleaning eq ${equation.join(' ')}`)
    if (isOperator(equation[equation.length - 1])) {
        equation.pop()
    }
    if (equation[0] === ''){
        equation.shift();
    }
    return equation;
}

let dictMD;
let dictAS;
let lowestIdxAS = 0;
let lowestIdxMD = 0;

function findLowestNonNegativeValue(dict) {
    let lowestNonNegative = Infinity;

    for (const key in dict) {
        const value = dict[key];
        if (value !== -1 && value < lowestNonNegative) {
            lowestNonNegative = value;
        }
    }

    return lowestNonNegative === Infinity ? -1 : lowestNonNegative;
} 

// COMPUTE FUNCTION
function computeEquation(equation) {

    equation = cleanEquationLastValue();
    console.log(`cleaned eq ${equation.join(' ')}`)

    while (equation.length > 2) {
        dictMD = {
            '*': equation.indexOf('*'),
            '/': equation.indexOf('/'),
        }
        dictAS = {
            '+': equation.indexOf('+'),
            '-': equation.indexOf('-'),
        }
    
        lowestIdxMD = findLowestNonNegativeValue(dictMD);
        lowestIdxAS = findLowestNonNegativeValue(dictAS);
    
        if (lowestIdxMD != -1) {
            opIdx = lowestIdxMD;
        }else {
            opIdx = lowestIdxAS;
        }

        operation = equation.slice(opIdx - 1, opIdx + 2);
        console.log(`operating on ${operation.join(' ')}`);
        result = operate(operation);
        if (result === "Infinity"){
            currNum = '0';
            equation = [''];
            valueDisplay.textContent = "BRUHHH!";
            return;
        }
        console.log(`result is ${result}`);
        equation.splice(opIdx - 1, 3, result);

    }
    console.log(`equation length is ${equation.length}`)

    valueDisplay.textContent = equation[equation.length - 1];
    console.log(`value displayed... new eq ${equation.join('_')}`)

    equation = [];
    currNum = valueDisplay.textContent;
}

/// clear
function clear() {
    equation = ['0'];
    currNum = '0';
    updateDisplayEquation();
    updateDisplayNum();
}

/// delete instead of +-
function deleteVal(){
    console.log(equation)
    if (equation === [''] || equation.length === 0){
        console.log(`equation was empty`);
        equation = ['0'];
        currNum = '0';
    } else {
        lastElement = equation[equation.length - 1];
        if (isOperator(lastElement)){
            cleanEquationLastValue();
        }else{
            if (lastElement.length === 1){
                equation.pop()
            }else {
                lastElement = lastElement.slice(0, -1);
                equation[equation.length - 1] = lastElement;
            }
        }
        if (isOperator(equation[equation.length - 1])){
            currNum = '0';
        }else{
            currNum = equation[equation.length - 1];
        }
    }

    if (equation === [''] || equation.length === 0){
        console.log(`equation was empty`);
        equation = ['0'];
        currNum = '0';
    }
    updateDisplayNum();
    updateDisplayEquation();

}

function percentPressed(){
    console.log("")
    indexPrePercentage = equation.lastIndexOf(currNum);
    currNum = divide(currNum, 100);
    equation[indexPrePercentage] = currNum;
    updateDisplayNum();
    updateDisplayEquation();
}

// DOM CONTENT
numberButtons = document.querySelectorAll('.number');
operationButtons = document.querySelectorAll('.operation');
equalButton = document.getElementById('equal');


clearButton = document.getElementById('clear');
deleteButton = document.getElementById('delete');
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

clearButton.addEventListener('click', () =>  {clear()});

deleteButton.addEventListener('click', () =>  {deleteVal()});

percentButton.addEventListener('click', () =>  {percentPressed()});

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
        // if there is already a . in the current num, dont add it
        return;
    } else if (currNum === '0' && button.textContent != '.') {
        // if a 0 is pressed, and there is no decimal pressed, update the number to the currNum
        currNum = button.textContent;
    } else {
        // if any other number is pressed, add it to the currNum
        currNum += button.textContent;
    }
    
    if (isOperator(equation[equation.length - 1])){
        // if a number is pressed after an operator, add the number to the equation array
        equation.push(currNum);
    } else {
        // if a number is pressed after another number, update the last element in equation to the currNum
        equation[equation.length - 1] = currNum;
    }
    
    updateDisplayNum();
    updateDisplayEquation();
}

// updates variables and the display based on the operator pressed +, -, x, /
function operationPressed(button) {
    // set the currOperator to the button pressed
    currOperator = matchOperation[button.textContent];

    if (isOperator(equation[equation.length - 1])) {
        equation[equation.length - 1] = currOperator;
    } else {
        equation.push(currOperator);
        currNum = '0'

    }
    // console.log(`operation pressed ... eq ${equation.join('_')}`);
    if (equation.length === 1 && isOperator(equation[0])){
        // console.log(`equation is only 1 length and has an operator`);
        equation = [''];
    }

    updateDisplayEquation();
}

// returns true if the given parameter is an operator
function isOperator(value) {
    return '+-/*'.includes(value);
}

// removes the last value of the equaiton if it is an operator and cleans the first index if it is empty
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

// finds the lowest non negative value in a dictionary, returns the value or -1 if one isnt found
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
    // console.log(`cleaned eq ${equation.join(' ')}`)

    while (equation.length > 2) {
        // get the index of each operator in the equation for the order of operations
        dictMD = {
            '*': equation.indexOf('*'),
            '/': equation.indexOf('/'),
        }
        dictAS = {
            '+': equation.indexOf('+'),
            '-': equation.indexOf('-'),
        }
        
        // Get the lowest multiplication/division index
        lowestIdxMD = findLowestNonNegativeValue(dictMD);
    
        if (lowestIdxMD != -1) {
            opIdx = lowestIdxMD;
        }else {
            // Get the lowest addition/subtraction index
            lowestIdxAS = findLowestNonNegativeValue(dictAS);
            opIdx = lowestIdxAS;
        }

        // create an operation vairable with the form [first num, operator, second num]
        operation = equation.slice(opIdx - 1, opIdx + 2);
        console.log(`operating on ${operation.join(' ')}`);
        result = operate(operation);
        if (result === "Infinity"){
            currNum = '0';
            equation = [''];
            // display a snarky remark if the operation results in infiinity, division by zero. 
            valueDisplay.textContent = "BRUHHH!";
            return;
        }
        console.log(`result is ${result}`);
        equation.splice(opIdx - 1, 3, result);

    }
    // console.log(`equation length is ${equation.length}`)

    // the equation will only be of length 1 and will contain the answer of the equation
    valueDisplay.textContent = equation[equation.length - 1];
    console.log(`value displayed... new eq ${equation.join('_')}`)

    equation = [];
    currNum = valueDisplay.textContent;
}

/// clear function resets the variables and sets the displays to 0
function clear() {
    equation = ['0'];
    currNum = '0';
    updateDisplayEquation();
    updateDisplayNum();
}

/// delete function deltes the last value of the last element in the equation
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

// takes the current nummber and divides it by 100, updates the equation and display 
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

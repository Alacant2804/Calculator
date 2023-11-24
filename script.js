let currentValue = "";
let nextValue = "";
let operator = "";
let result = 0;

let isFirstNumberEntered = false;
let equalsButtonClicked = false;

const equal = document.querySelector(".equals");



const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        console.error("Cannot divide by zero");
        return;
    }
};

const operate = function(a, operator, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            console.error("Invalid operator");
            return;
    }
};

//Appending numbers to global variables
function appendNumber(number) {
    if(!isFirstNumberEntered) { //Checking if it is the first number 
        currentValue = parseFloat(number);
    } else {
        // Check if nextValue is already set
        if (nextValue === "") {
            nextValue = parseFloat(number);
        } else {
            // Reset nextValue to the new number
            nextValue = parseFloat(number);
        }
    }

    updateDisplay();
}

//Checking if we can add the opetor to display
function appendOperator(operatorSymbol) {
    if (!isFirstNumberEntered) {
        operator = operatorSymbol;
        isFirstNumberEntered = true;
    } else {
        // Check if there is a previous result
        if (result !== 0) {
            currentValue = result;
            result = 0; // Reset the result
        }
        operator = operatorSymbol;
    }

    updateDisplay();
}
//Calculating the result
function calculate(currentValue, operator, nextValue) {
    const a = currentValue;
    const b = nextValue;

    if (!isNaN(a) && !isNaN(b)) {
        result = operate(a, operator, b);
        currentValue = result; // Update currentValue with the result
        nextValue = ""; // Reset nextValue
        updateDisplay(result);
        isFirstNumberEntered = false;
    } else {
        console.log("Invalid numeric input!");
    }

    equalsButtonClicked = false;
    return result;
}


//Function for showing what is currently displaying on the page
function updateDisplay(result) {
    if (equalsButtonClicked) {
        // Update the display only if the equals button was clicked
        document.querySelector(".display").value = result;
    } else {
        // Update the display with the current value, operator, and next value
        if (result !== undefined && result !== null) {
            // If there is a result, display it along with the operator and next value
            document.querySelector(".display").value = result + operator + nextValue;
        } else {
            // Otherwise, display the current value, operator, and next value
            document.querySelector(".display").value = currentValue + operator + nextValue;
        }
    }
}


//Function for clearing display
function clearDisplay() {
    currentValue = "";
    operator = "";
    nextValue = ""; 
    updateDisplay();
}

//Looping through numbers and adding event listener to each one. 
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent; //When the number is clicked saving it in number variable 
        appendNumber(number);   //Passing number to appendNumber function
    })
})

//Looping through operations and adding event listener to each one. 
document.querySelectorAll('.plus, .minus, .multiplication, .division').forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent; //When clicked saving clicked operator in operator variable.
        appendOperator(operator);   //Passing operator to appendOperator function
    });
});

//Adding event listener to equal button
equal.addEventListener('click', function() {
    equalsButtonClicked = true; //Changing the flag when the equal button clicked
    calculate(currentValue, operator, nextValue); //Calculating the result when the equal button is clicked
});

//Clear the display when the CLEAR button clicked
document.querySelector('.clear').addEventListener('click', clearDisplay);
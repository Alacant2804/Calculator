document.addEventListener('DOMContentLoaded', () => {
    let currentValue = "";
    let nextValue = "";
    let operator = "";
    let result = 0;

    let isFirstNumberEntered = false;
    let equalsButtonClicked = false;

    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll('.plus, .minus, .multiplication, .division');
    const equal = document.querySelector(".equals");
    const clearButton = document.querySelector('.clear');
    const display = document.querySelector(".display");

    const add = (a, b) => a + b;

    const subtract = (a, b) => a - b;

    const multiply = (a, b) => a * b;

    const divide = (a, b) => {
        if (b !== 0) {
            return a / b;
        } else {
            throw new Error("Cannot divide by zero");
        }
    };

    const operate = (a, operator, b) => {
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
                throw new Error("Invalid operator");
        }
    };

    const updateDisplay = () => {
        if (equalsButtonClicked) {
            display.value = result;
        } else {
            display.value = currentValue + operator + nextValue;
        }
    };

    const clearDisplay = () => {
        currentValue = "";
        operator = "";
        nextValue = "";
        updateDisplay();
    };

    const appendNumber = number => {
        if (!isFirstNumberEntered) {
            currentValue += number;
        } else {
            nextValue += number;
        }
        updateDisplay();
    };

    numbers.forEach(button => {
        button.addEventListener('click', () => {
            const number = button.textContent;
            appendNumber(number);
        })
    });

    const appendOperator = operatorSymbol => {
        if (!isFirstNumberEntered) {
            operator = operatorSymbol;
            isFirstNumberEntered = true;
        } else {
            if (nextValue !== "") {
                calculate();
            }
            operator = operatorSymbol;
        }
        updateDisplay();
    };

    operators.forEach(button => {
        button.addEventListener('click', () => {
            const operatorSymbol = button.textContent;
            appendOperator(operatorSymbol);
        });
    });

    equal.addEventListener('click', () => {
        equalsButtonClicked = true;
        calculate();
    });

    clearButton.addEventListener('click', clearDisplay);

    const calculate = () => {
        const a = parseFloat(currentValue);
        const b = parseFloat(nextValue);

        if (!isNaN(a) && !isNaN(b)) {
            result = operate(a, operator, b);
            currentValue = result.toString();
            nextValue = "";
            updateDisplay(result);
            isFirstNumberEntered = false;
        } else {
            console.error("Invalid numeric input!");
        }

        equalsButtonClicked = false;
    };
});

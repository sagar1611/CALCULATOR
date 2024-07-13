document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operationSequence = '';

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const value = event.target.innerText;
            handleInput(value);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (isFinite(key) || key === '.') {
            handleInput(key);
        } else if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleBackspace();
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            handleInput(convertKeyToOperation(key));
        } else if (key.toLowerCase() === 'c') {
            handleInput('C');
        }
        updateDisplay();
    });

    function handleInput(value) {
        if (isNaN(value) && value !== '.') {
            handleOperation(value);
        } else {
            handleNumber(value);
        }
        updateDisplay();
    }
    
    function handleNumber(number) {
        currentInput += number;
        operationSequence += number;
    }

    function handleBackspace() {
        if (operationSequence.length > 0) {
            operationSequence = operationSequence.slice(0, -1);
            currentInput = currentInput.slice(0, -1);
        }
    }
    
    function handleOperation(operation) {
        switch (operation) {
            case 'C':
                currentInput = '';
                operationSequence = '';
                break;
            case '=':
                try {
                    currentInput = eval(operationSequence.replace(/×/g, '*').replace(/÷/g, '/')).toString();
                    operationSequence = currentInput;
                } catch (e) {
                    currentInput = 'Error';
                    operationSequence = '';
                }
                break;
            case '.':
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    operationSequence += '.';
                }
                break;
            case '+/-':
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) * -1).toString();
                    operationSequence = operationSequence.slice(0, -currentInput.length) + currentInput;
                }
                break;
            case '%':
                if (currentInput !== '') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    operationSequence = operationSequence.slice(0, -currentInput.length) + currentInput;
                }
                break;
            default:
                if (currentInput !== '') {
                    operationSequence += operation;
                    currentInput = '';
                }
                break;
        }
    }
    
    function convertKeyToOperation(key) {
        switch (key) {
            case '+':
                return '+';
            case '-':
                return '-';
            case '*':
                return '×';
            case '/':
                return '÷';
            case '%':
                return '%';
            default:
                return '';
        }
    }

    function updateDisplay() {
        display.innerText = operationSequence || '0';
    }
});

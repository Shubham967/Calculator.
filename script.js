let numberButtons = document.querySelectorAll("#number");
let operatorButtons = document.querySelectorAll("#operator");
let equalBtn = document.querySelector("#equalBtn");
let dotBtn = document.querySelector("#DotBtn");
let deleteButton = document.querySelector("#Deletebtn");
let clearButton = document.querySelector("#clearBtn");
let currentText = document.querySelector(".current-Text");
let prevText = document.querySelector(".prev-Text");
let currentOperand = null;
let currentResult = null;
let firstNumber = null;
let secondNumber = null;
let shouldResetScreen = false;
numberButtons = Array.from(numberButtons);
operatorButtons = Array.from(operatorButtons);

function Add(a,b) {
   return a + b;
}

function Subtract(a,b) {
  return a - b;
}

function Divide(a,b) {
   return a/b;
}

function Multiply(a,b) {
   return a * b;
}

function Operate(number1,number2,operator){
   let a = Number(number1);
   let b = Number(number2);
   switch(operator){
    case '+':
        return Add(a,b);
    case '-':
        return Subtract(a,b);
    case 'x':
        return Multiply(a,b);
    case '/':
        return Divide(a,b);
   }
}

function OnEqualTo(){
    if (shouldResetScreen || currentOperand == null) {
        return;
    }
    Evaluate();
    prevText.textContent = firstNumber + currentOperand + secondNumber + "=";
    currentOperand = null;
}

function AppendNumber(text) {
    if(currentText.textContent == '0' || shouldResetScreen) {
        ResetScreen()
    }
   currentText.textContent += text;
}

function Evaluate() {
    if (shouldResetScreen || currentOperand == null) {
        return;
    }
    secondNumber = currentText.textContent;
    let result =  Math.round(Operate(firstNumber,secondNumber,currentOperand) * 1000)/1000;
    currentText.textContent = result;
}

function OnOperatorPressed(operator){
   if(currentOperand != null) {
    Evaluate();
   }
   currentOperand = operator;
   firstNumber = currentText.textContent;
   prevText.textContent = firstNumber + operator; 
   shouldResetScreen = true;
}

function ResetScreen() {
   currentText.textContent = "";
   shouldResetScreen = false
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '/';
    if (keyboardOperator === '*') return 'x';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
}

function AppendDot() {
    if(currentText.textContent == ""){
        currentText.textContent = "0";
    }
    if (currentText.textContent.includes('.')) return
    currentText.textContent += ".";
}

function deleteNumber() {
    currentText.textContent = currentText.textContent.slice(0,-1);
}

function clear() {
    currentText.textContent = "0";
    prevText.textContent = "";
    firstNumber = null;
    secondNumber = null;
    currentOperand = null;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9)
  {
    AppendNumber(e.key);
  } 
  if (e.key == '.'){
    AppendDot();
  } 
  if (e.key == '=' || e.key == 'Enter') {
    OnEqualTo();
  } 
  if (e.key == 'Backspace'){
    deleteNumber();
  }
  if (e.key == 'Escape'){
    clear();
  } 
  if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/')
  {
    OnOperatorPressed(convertOperator(e.key));
  }
}


operatorButtons.forEach((button) => {
    button.addEventListener('click' , (event) => OnOperatorPressed(button.textContent));
})


numberButtons.forEach((button) => {
    button.addEventListener('click' , (event) => AppendNumber(button.textContent));
})

equalBtn.addEventListener('click' , (event) => OnEqualTo())

clearButton.addEventListener('click', function(event){
   clear();
})

deleteButton.addEventListener('click', function(event){
    deleteNumber();
})

dotBtn.addEventListener('click',(event) => AppendDot())

window.addEventListener('keydown', handleKeyboardInput)

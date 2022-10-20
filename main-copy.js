function operation() {
  let historyScreen = document.querySelector("#historyScreen");
  let currentScreen = document.querySelector("#currentScreen");
  const delButton = document.querySelector(".delete");
  let clearButton = document.querySelector(".clear");
  const numButtons = document.querySelectorAll(".number");
  const opButtons = document.querySelectorAll(".operator");

  let firstOperand = null;
  let secondOperand;
  let operator = "";
  let evaluate = 0;
  let triggerCleanScreen = true;
  let decimalTrigger = false;
  let operatorTrigger = true;
  let triggerEvalScreen = false;

  numButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      //if negate button is pressed when current screen has evaluate content on it.
      // To keep negated evaluate content on screen as firstOperand before screen clears
      if (e.target.textContent === "+/-" && triggerEvalScreen === true) {
        firstOperand *= -1;
        historyScreen.textContent = firstOperand + operator;
        currentScreen.textContent = firstOperand;
        return;
      }
      operatorTrigger = false;
      //cleans the display
      if (triggerCleanScreen) {
        currentScreen.textContent = "";
        triggerCleanScreen = false;
        decimalTrigger = false;
        triggerEvalScreen = false;
      }
      //number buttons event handler
      //no more than 23 symbols
      if (currentScreen.textContent.length < 23) {
        //negate button handler
        if (e.target.textContent === "+/-") {
          if (currentScreen.textContent !== "") {
            //switch to negative
            currentScreen.textContent *= -1;
          } else {
            operatorTrigger = true;
          }
        } else {
          if (e.target.textContent === ".") {
            //decimal handler
            if (decimalTrigger === false) {
              if (currentScreen.textContent === "") {
                currentScreen.textContent = "0";
              }
              currentScreen.textContent += e.target.textContent; //current screen text content with decimal button
              decimalTrigger = true;
            }
          } else {
            currentScreen.textContent += e.target.textContent; //current screen text content
            // console.log(currentScreen.textContent.length + " length");
          }
        }
      }
      // else {
      //   return;
      // }
    });
  });

  opButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
      //check trigger
      if (operatorTrigger === false) {
        //if trigger not in a default position - switch it into default
        operatorTrigger = true;
        //if there is no first operand = create one
        if (firstOperand === null) {
          firstOperand = currentScreen.textContent;
          //assign operator to a variable
          operator = e.target.textContent;
          //display on history screen
          historyScreen.textContent += firstOperand + operator;
          //switch cleanscreen trigger so current screen will be empty when new number is entered
          triggerCleanScreen = true;
        } else {
          //if there is first operand, create secondOperand from numbers on the screen
          secondOperand = currentScreen.textContent;
          //run calculation after there are two operands and operator
          calculate(operator, firstOperand, secondOperand);
          //display result of calculation on currentScreen
          currentScreen.textContent = evaluate;
          //save next operator if it's not equals = if it's equals - don't save it into operator var
          if (e.target.textContent !== "=") {
            operator = e.target.textContent;
          }
          //move evaluate and operator to history screen
          historyScreen.textContent = evaluate + operator;
          //flag for negate button to start negating screen with evaluate value
          triggerEvalScreen = true;
          //assign calculation result to firstOperand
          firstOperand = evaluate;
          triggerCleanScreen = true;
        }
      } else {
        //if operator trigger in default position
        if (firstOperand !== null) {
          if (e.target.textContent !== "=") {
            //to get next operator and display it without calculation
            //- this preventing operator buttons to be continuously pressed
            operator = e.target.textContent;
            historyScreen.textContent = firstOperand + operator;
          }
        }
      }
    });
  });

  const calculate = function (op, firstOperand, secondOperand) {
    switch (op) {
      case "+":
        evaluate = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case "-":
        evaluate = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case "x":
        evaluate = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case "÷":
        if (secondOperand != 0) {
          console.log(secondOperand);
          evaluate = parseFloat(firstOperand) / parseFloat(secondOperand);
        } else {
          evaluate = 0;
          alert("Cannot divide by 0");
        }
        break;
      default:
        break;
    }
  };

  clearButton.addEventListener("click", () => {
    historyScreen.textContent = "";
    currentScreen.textContent = "";
    firstOperand = null;
    secondOperand = null;
    operator = "";
    triggerCleanScreen = true;
    decimalTrigger = false;
    operatorTrigger = true;
  });

  delButton.addEventListener("click", () => {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
  });
}
operation();

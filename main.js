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
      if (currentScreen.textContent.length < 23) {
        //negate button handler
        if (e.target.textContent === "+/-") {
          if (currentScreen.textContent !== "") {
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
              currentScreen.textContent += e.target.textContent;
              decimalTrigger = true;
            }
          } else {
            currentScreen.textContent += e.target.textContent;
          }
        }
      }
    });
  });

  opButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
      if (operatorTrigger === false) {
        operatorTrigger = true;
        if (firstOperand === null) {
          firstOperand = currentScreen.textContent;
          operator = e.target.textContent;
          historyScreen.textContent += firstOperand + operator;
          triggerCleanScreen = true;
        } else {
          //if there is first operand, create secondOperand from numbers on the screen
          secondOperand = currentScreen.textContent;
          calculate(operator, firstOperand, secondOperand);
          currentScreen.textContent = evaluate;
          //save next operator if it's not equals = if it's equals - don't save it into operator var
          if (e.target.textContent !== "=") {
            operator = e.target.textContent;
          }
          historyScreen.textContent = evaluate + operator;
          //flag for negate button to start negating screen with evaluate value
          triggerEvalScreen = true;
          firstOperand = evaluate;
          triggerCleanScreen = true;
        }
      } else {
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

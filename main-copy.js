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
      if (e.target.textContent === "+/-" && triggerEvalScreen) {
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

      if (currentScreen.textContent.length < 23) {
        //number buttons event handler
        //no more than 23 symbols
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
              // operatorTrigger = false;
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
      if (operatorTrigger === false) {
        operatorTrigger = true;
        if (firstOperand === null) {
          firstOperand = currentScreen.textContent;
          console.log(firstOperand + " 1st");
          operator = e.target.textContent;
          historyScreen.textContent += firstOperand + operator;
          triggerCleanScreen = true;
        } else {
          secondOperand = currentScreen.textContent;
          console.log(secondOperand + " 2nd");
          calculate(operator, firstOperand, secondOperand);
          currentScreen.textContent = evaluate;

          if (e.target.textContent !== "=") {
            operator = e.target.textContent;
          }

          historyScreen.textContent = evaluate + operator;
          triggerEvalScreen = true;
          firstOperand = evaluate;
          triggerCleanScreen = true;
        }
      } else {
        if (firstOperand !== null) {
          if (e.target.textContent !== "=") {
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
          // currentScreen.textContent = "Cannot divide by 0";
          alert("Cannot divide by 0");
        }
        break;
      default:
        break;
    }
  };

  // const divide = function () {
  //   if (secondOperand !== 0) {
  //     evaluate = parseFloat(firstOperand) / parseFloat(secondOperand);
  //     // } else {
  //     //   evaluate = 0;
  //     //   console.log(evaluate);
  //     //   currentScreen.textContent = "Cannot divide by 0";
  //   }
  // };

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

function operation() {
  let historyScreen = document.querySelector("#historyScreen");
  let currentScreen = document.querySelector("#currentScreen");
  const delButton = document.querySelector(".delete");
  let clearButton = document.querySelector(".clear");
  const equalsButton = document.querySelector(".equals");
  const numButtons = document.querySelectorAll(".number");
  const opButtons = document.querySelectorAll(".operator");
  const decimalButton = document.querySelector(".decimal");
  const switchButton = document.querySelector(".switch");
  const buttons = document.querySelectorAll(".btn");
  let firstOperand = null;
  let secondOperand;
  let operator = "";
  let evaluate = 0;
  let trigger = true;
  let decimalTrigger = false;

  numButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (trigger) {
        currentScreen.textContent = "";
        trigger = false;
        decimalTrigger = false;
      }

      if (e.target.textContent === "+/-") {
        currentScreen.textContent *= -1;
      } else {
        if (e.target.textContent === ".") {
          if (decimalTrigger === false) {
            currentScreen.textContent += e.target.textContent;
            decimalTrigger = true;
          }
        } else {
          currentScreen.textContent += e.target.textContent;
        }
      }
    });
  });

  opButtons.forEach((op) => {
    op.addEventListener("click", (e) => {
      if (firstOperand === null) {
        firstOperand = currentScreen.textContent;
        console.log(firstOperand + " 1st");
        operator = e.target.textContent;
        historyScreen.textContent += firstOperand + operator;
        trigger = true;
      } else {
        secondOperand = currentScreen.textContent;
        console.log(secondOperand + " 2nd");
        calculate(operator, firstOperand, secondOperand);
        currentScreen.textContent = evaluate;
        if (e.target.textContent !== "=") {
          operator = e.target.textContent;
        }
        historyScreen.textContent = evaluate + operator;
        firstOperand = evaluate;
        trigger = true;
      }
    });
  });

  // function operation(operator, firstOperand, secondOperand) {}

  const calculate = function (op, firstOperand, secondOperand) {
    switch (op) {
      case "+":
        evaluate = parseFloat(firstOperand) + parseFloat(secondOperand);

        break;

      case "-":
        evaluate = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;

      case "*":
        evaluate = parseFloat(firstOperand) * parseFloat(secondOperand);

        break;
      case "/":
        if (secondOperand == 0) {
          evaluate = 0;
          currentScreen.textContent = "Cannot divide by 0";
        } else {
          evaluate = parseFloat(firstOperand) / parseFloat(secondOperand);
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
    trigger = true;
  });
  delButton.addEventListener("click", () => {
    currentScreen.textContent = currentScreen.textContent.slice(0, -1);
  });
}
operation();

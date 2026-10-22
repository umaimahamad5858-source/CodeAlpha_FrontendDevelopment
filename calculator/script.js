const currentEl = document.getElementById("current");
const historyEl = document.getElementById("history");
const keys = document.querySelector(".keys");

let currentValue = "0";
let previousValue = null;
let operator = null;
let resetNext = false;

const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };

function updateDisplay() {
  currentEl.textContent = currentValue;
  historyEl.textContent = previousValue !== null && operator
    ? `${previousValue} ${symbols[operator]}`
    : "";
}

function inputNumber(value) {
  if (currentValue === "Error" || resetNext || currentValue === "0") {
    currentValue = value;
    resetNext = false;
  } else {
    currentValue += value;
  }
  updateDisplay();
}

function inputDecimal() {
  if (currentValue === "Error" || resetNext) {
    currentValue = "0.";
    resetNext = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

function calculate(a, b, op) {
  const first = Number(a);
  const second = Number(b);

  switch (op) {
    case "+": return first + second;
    case "-": return first - second;
    case "*": return first * second;
    case "/": return second === 0 ? "Error" : first / second;
    default: return "Error";
  }
}

function formatResult(value) {
  if (value === "Error" || !Number.isFinite(value)) return "Error";
  return String(Number(value.toFixed(10)));
}

function chooseOperator(nextOperator) {
  if (currentValue === "Error") return;

  if (operator && !resetNext) {
    const result = formatResult(calculate(previousValue, currentValue, operator));
    if (result === "Error") {
      currentValue = "Error";
      previousValue = null;
      operator = null;
      resetNext = true;
      updateDisplay();
      return;
    }
    currentValue = result;
  }

  previousValue = currentValue;
  operator = nextOperator;
  resetNext = true;
  updateDisplay();
}

function equals() {
  if (!operator || resetNext || currentValue === "Error") return;

  const expression = `${previousValue} ${symbols[operator]} ${currentValue} =`;
  const result = formatResult(calculate(previousValue, currentValue, operator));

  historyEl.textContent = expression;
  currentValue = result;
  previousValue = null;
  operator = null;
  resetNext = true;
  currentEl.textContent = currentValue;
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  resetNext = false;
  updateDisplay();
}

function deleteLast() {
  if (resetNext || currentValue === "Error") return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
  if (currentValue === "-") currentValue = "0";
  updateDisplay();
}

function percent() {
  if (currentValue === "Error") return;
  const result = formatResult(Number(currentValue) / 100);
  currentValue = result;
  updateDisplay();
}

keys.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const { action, value } = button.dataset;

  if (action === "number") inputNumber(value);
  else if (action === "decimal") inputDecimal();
  else if (action === "operator") chooseOperator(value);
  else if (action === "equals") equals();
  else if (action === "clear") clearAll();
  else if (action === "delete") deleteLast();
  else if (action === "percent") percent();
});

document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) inputNumber(event.key);
  else if (event.key === ".") inputDecimal();
  else if (["+", "-", "*", "/"].includes(event.key)) {
    event.preventDefault();
    chooseOperator(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    equals();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key === "Escape" || event.key.toLowerCase() === "c") {
    clearAll();
  } else if (event.key === "%") {
    percent();
  }
});

updateDisplay();

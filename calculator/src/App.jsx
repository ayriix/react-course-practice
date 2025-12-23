import { useState } from "react";
import "./index.css";

//1 - Создайте состояние input, которое будет отображать результат вычислений в калькуляторе.
//2 - Создайте 2 функции для увеличения или уменьшения значения input на +1 или -1 и назначьте их на кнопки +1 / -1.

//3 - Создайте функцию, которая будет выполнять определенную операцию на калькуляторе в зависимости от нажатой кнопки. В результате работы этой функции должен получиться полностью рабочий калькулятор. Используйте эту функцию в обработчиках событий для всех кнопок.

//P.S. Если сложно продумать одну универсальную функцию, можете создать столько функций, сколько нужно. Не переживайте о чистоте кода.

//P.P.S. В JavaScript есть метод eval(), который преобразует любую строку в JavaScript-выражение.
//Пример: eval("console.log('Hello')") — выполнит этот код.
// Используйте этот метод для всех операций в калькуляторе.

function Calculator() {
  const [inputValue, setInputValue] = useState("0");

  function incValue() {
    const currentValue = eval(inputValue);
    setInputValue(String(currentValue + 1));
  }
  function decValue() {
    const currentValue = eval(inputValue);
    setInputValue(String(currentValue - 1));
  }

  function calculate(value) {
    switch (value) {
      case "C":
        setInputValue("0");
        return;
      case "=":
        setInputValue(String(eval(inputValue)));
        return;
      default:
        setInputValue((prevValue) =>
          prevValue === "0" ? value : prevValue + value
        );
    }
  }

  return (
    <div className="calculator-container">
      <h1 className="calculator-title">UseState Calculator</h1>
      <div className="calculator">
        <div className="display">{inputValue}</div>
        <div className="increment-buttons">
          <button className="increment" onClick={incValue}>
            +1
          </button>
          <button className="decrement" onClick={decValue}>
            -1
          </button>
        </div>
        <div className="buttons">
          <button onClick={() => calculate("1")}>1</button>
          <button onClick={() => calculate("2")}>2</button>
          <button onClick={() => calculate("3")}>3</button>
          <button className="operator" onClick={() => calculate("+")}>
            +
          </button>
          <button onClick={() => calculate("4")}>4</button>
          <button onClick={() => calculate("5")}>5</button>
          <button onClick={() => calculate("6")}>6</button>
          <button className="operator" onClick={() => calculate("-")}>
            -
          </button>
          <button onClick={() => calculate("7")}>7</button>
          <button onClick={() => calculate("8")}>8</button>
          <button onClick={() => calculate("9")}>9</button>
          <button className="operator" onClick={() => calculate("*")}>
            ×
          </button>
          <button onClick={() => calculate("0")}>0</button>
          <button onClick={() => calculate(".")}>,</button>
          <button className="equals" onClick={() => calculate("=")}>
            =
          </button>
          <button className="operator" onClick={() => calculate("/")}>
            ÷
          </button>
          <button className="clear" onClick={() => calculate("C")}>
            C
          </button>
        </div>
      </div>
      <div className="technologies-used">
        <p>
          <strong>Technologies used:</strong> React, JSX, CSS Modules,
          JavaScript (useState, events handling)
        </p>
      </div>
    </div>
  );
}

export default Calculator;

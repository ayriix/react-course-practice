import { useState, useEffect } from "react";
import "./index.css";
import CurrenciesList from "./CurrenciesList";

const KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
const CURRENCIES = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];
// `https://api.frankfurter.app/latest?amount={amount}&from={baseCurrency}&to={targetCurrency}` - old api

export default function App() {
  const [amount, setAmount] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [converted, setConverted] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!amount) {
      setConverted("");
      setError("Amount cannot be zero");
      return;
    }

    if (baseCurrency === targetCurrency) {
      setConverted("");
      setError("Error! You have chosen the same currencies");
      return;
    }

    async function getRates() {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`
        );
        const data = await response.json();
        console.log(data.rates);

        // if (!response.ok || !data.success) {
        //   throw new Error("Network error.");
        // }
        setError(null);

        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: targetCurrency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(data.rates[targetCurrency]);

        setConverted(formatted);
      } catch {
        setError("Invalid amount! Try different value.");
        setConverted("");
      }
    }

    getRates();
  }, [amount, baseCurrency, targetCurrency]);

  function renderError() {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Currency Converter</h1>
        <div className="amount-block">
          <input
            type="number"
            name="amount"
            min="0"
            inputMode="decimal"
            value={amount}
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="currency-row">
            <CurrenciesList
              currencies={CURRENCIES}
              value={baseCurrency}
              handleCurrency={setBaseCurrency}
            />
            <span
              className="arrow"
              onClick={() => {
                setBaseCurrency(targetCurrency);
                setTargetCurrency(baseCurrency);
              }}
            >
              ⇅
            </span>
            <CurrenciesList
              currencies={CURRENCIES}
              value={targetCurrency}
              handleCurrency={setTargetCurrency}
            />
          </div>

          {error && renderError()}
          {!error && converted && (
            <div className="result">
              <span className="label">Converted</span>
              <span className="value">{converted}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

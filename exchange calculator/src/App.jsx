import { useState, useEffect } from "react";
import "./index.css";
import CurrenciesList from "./CurrenciesList";

// const KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

export default function App() {
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [converted, setConverted] = useState("");
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAmountLimit = (e) => {
    const value = e.target.value;

    if (value.length > 16) return;
    const numValue = Number(value);
    if (Number.isNaN(numValue)) return;
    setAmount(value);
  };

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
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${targetCurrency}`
        );
        const data = await response.json();
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
      } finally {
        setLoading(false);
      }
    }
    const debounceTimer = setTimeout(() => {
      getRates();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [amount, baseCurrency, targetCurrency]);

  useEffect(() => {
    async function getCurrencies() {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    }
    getCurrencies();
  }, []);

  function renderError() {
    return <p className="error">{error}</p>;
  }
  function renderLoading() {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Currency Converter</h1>
        <div className="amount-block">
          <input
            type="number"
            name="amount"
            min="1"
            inputMode="decimal"
            value={amount}
            placeholder="Enter amount"
            onChange={handleAmountLimit}
          />
          <div className="currency-row">
            <CurrenciesList
              currencies={currencies}
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
              currencies={currencies}
              value={targetCurrency}
              handleCurrency={setTargetCurrency}
            />
          </div>

          {error && renderError()}
          {loading && renderLoading()}
          {!error && !loading && converted && (
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

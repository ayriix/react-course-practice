export default function CurrenciesList({ currencies, value, handleCurrency }) {
  return (
    <select value={value} onChange={(e) => handleCurrency(e.target.value)}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}

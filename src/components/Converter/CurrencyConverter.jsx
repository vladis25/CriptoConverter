import React, { useState, useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import CurrencySelector from "../CurrencySelector";

import styles from "./сurrencyConverter.module.css";

const CurrencyConverter = () => {
  const [fiatCurrencies, setFiatCurrencies] = useState(["UAH", "USD", "EURO"]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [selectedFiat, setSelectedFiat] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Отримання валют
    setFiatCurrencies(["UAH", "USD", "EUR"]);

    // Отримання криптовалют з API
    fetch("https://whitebit.com/api/v4/public/ticker")
      .then((response) => response.json())
      .then((data) => {
        const cryptoCurrencies = Object.keys(data);
        setCryptoCurrencies(cryptoCurrencies);
      })
      .catch((error) => {
        console.error("Error fetching crypto currencies:", error);
      });
  }, []);

  // отримання курсу
  useEffect(() => {
    // отримання обмінного курсу між вибраною валютою та криптовалютою
    if (selectedFiat && selectedCrypto) {
      // Отримання курсу криптовалюти в обрану валюту з API
      fetch(`https://whitebit.com/api/v4/public/ticker/${selectedCrypto}`)
        .then((response) => response.json())
        .then((data) => {
          const cryptoRate = data[selectedFiat];
          if (cryptoRate) {
            setExchangeRate(cryptoRate);
          } else {
            console.error("Error finding exchange rate for selected currencies");
          }
        })
        .catch((error) => {
          console.error("Error fetching exchange rate:", error);
        });
    }
  }, [selectedFiat, selectedCrypto]);

  // Функції для обробки подій введення, вибору та конвертації
  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleFiatChange = (value) => {
    setSelectedFiat(value);
  };

  const handleCryptoChange = (value) => {
    setSelectedCrypto(value);
  };

  const handleConvert = () => {
    if (amount && exchangeRate) {
      const result = amount * exchangeRate;
      setConvertedAmount(result);
    }
    console.log(exchangeRate, amount)
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Currency Converter</h1>
      <Input
        label="Enter the amount of cryptocurrency:"
        value={amount}
        onChange={handleAmountChange}
      />
      <CurrencySelector
        label="Choose fiat currency"
        options={fiatCurrencies}
        selected={selectedFiat}
        onChange={handleFiatChange}
        className={styles.selector}
      />
      <CurrencySelector
        label="Choose cryptocurrency:"
        options={cryptoCurrencies}
        selected={selectedCrypto}
        onChange={handleCryptoChange}
        className={styles.selector}
      />
      <Button onClick={handleConvert} variant="primary" className={styles.button}>
        Convert
      </Button>
      {exchangeRate && (
        <p className={styles.info}>Exchange rate: {exchangeRate} {selectedCrypto} to 1 {selectedFiat}</p>
      )}
      {convertedAmount && <p className={styles.info}>Converted amount: {convertedAmount} {selectedFiat}</p>}
    </div>
  );
};

export default CurrencyConverter;

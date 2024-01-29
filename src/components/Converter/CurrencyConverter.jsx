import React, { useState, useMemo, useEffect } from "react";
import { readExchangeRates } from '../../api/bank';
import { readCryptoCurrencies } from '../../api/cryptoCurrencies';
import { REQUIRED_CURRENCIES, UAH, USD } from '../../constants/currencies';
import { getRates } from '../../services/fiatService';
import { getRatesRelatedToCurrency } from '../../services/cryptoService';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import classes from './сurrencyConverter.module.css';
import { TextareaAutosize } from "@mui/material";

const CurrencyConverter = () => {
  const [data, setData] = useState({ fiat: [], crypto: {} });
  const [selectedCurrency, setSelectedCurrency] = useState(USD);
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState('USDT_UAH');
  const [amount, setAmount] = useState(Number);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [result, setResult] = useState(null);

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  // дістаємо дані з api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fiatData, cryptoData] = await Promise.all([
          readExchangeRates(),
          readCryptoCurrencies(),
        ]);
        setData({ fiat: fiatData, crypto: cryptoData });
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchData();
  }, []);

  // Виведення ціни криптовалюти в гривні
  const { crypto } = useMemo(() => ({
    crypto: getRatesRelatedToCurrency(data.crypto, UAH),
    rates: getRates(data.fiat),
  }), [data]);

  // Виведення криптовалюти
  const target = crypto.find((item) => item.name === selectedCryptoCurrency);

  // Конвертація
  const handleConvert = () => {
    const fiatRate = data.fiat.find((item) => item.cc === selectedCurrency)?.rate;
    const result = (amount * target?.last_price) / fiatRate;

    if (!isNaN(result) && isFinite(result)) {
      setConvertedAmount(result);
      setResult(`${amount} ${selectedCryptoCurrency} = ${result.toFixed(2)} ${selectedCurrency}`);
    } else {
      setResult("Сумма менша за одиницю валюти");
    }
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Converter</h1>
      <h3>{selectedCryptoCurrency}: {Math.floor(target?.last_price * amount)} UAH</h3>
      <div className={`${classes.list} ${classes.form}`}>
        <FormControl className={classes.warpSelect}>
          <TextField
            label="Кількість"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            type="number"
            variant="outlined"
            margin="normal"
          />
        </FormControl>
        <div>
        <FormControl className={classes.selector}>
          <InputLabel id="currency-label" className={classes.selectorLabel}>Валюта</InputLabel>
          <Select
            labelId="currency-label"
            id="currency-select"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {REQUIRED_CURRENCIES.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.selector}>
          <InputLabel id="crypto-currency-label" className={classes.selectorLabel}>Криптовалюта</InputLabel>
          <Select
            labelId="crypto-currency-label"
            id="crypto-currency-select"
            value={selectedCryptoCurrency}
            onChange={(e) => setSelectedCryptoCurrency(e.target.value)}
          >
            {crypto.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </div>
      </div>
       <h3 className={classes.result}>{result}</h3>
      <Button onClick={handleConvert} className={classes.button} variant="outlined" color="primary">
        Convert
      </Button>
    </div>
  );
};

export default CurrencyConverter;

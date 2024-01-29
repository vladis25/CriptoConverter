import { REQUIRED_CURRENCIES } from "../constants/currencies";

export const getRates = (rates) => {
  return rates.filter((rate) => REQUIRED_CURRENCIES.includes(rate.cc));
};

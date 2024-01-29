export const readExchangeRates = () =>
  fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json").then((response) => response.json());

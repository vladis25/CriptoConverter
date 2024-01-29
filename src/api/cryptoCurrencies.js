export const readCryptoCurrencies = () => fetch("https://whitebit.com/api/v4/public/ticker").then((response) => response.json());

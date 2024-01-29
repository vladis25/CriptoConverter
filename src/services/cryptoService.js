export const getRatesRelatedToCurrency = (rates, currency) => {
    const keys = Object.keys(rates);

    const currencyRelatedRates = keys.filter((key) => key.includes(currency))

    return currencyRelatedRates.map((name) => ({ ...rates[name], name }));
}
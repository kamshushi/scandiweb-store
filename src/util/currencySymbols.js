export const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "AUD":
      return "A$";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    default:
      return null;
  }
};

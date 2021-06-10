const calculateTotal = (products, currencyIndex) => {
  let total = 0;
  products.forEach((product) => {
    const { prices, quantity } = product;
    total =
      total + parseFloat((prices[currencyIndex].amount * quantity).toFixed(2));
  });
  return total.toFixed(2);
};
export default calculateTotal;

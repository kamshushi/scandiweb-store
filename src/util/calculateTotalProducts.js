const calculateTotalProducts = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.quantity;
  });
  return total;
};

export default calculateTotalProducts;

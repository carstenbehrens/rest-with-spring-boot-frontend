export default function findProductById(products, id) {
  return products.find((item) => item.id === id);
}

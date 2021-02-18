class ProductService {
  async get() {
    try {
      const res = await fetch("/products/");
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}

export default ProductService;

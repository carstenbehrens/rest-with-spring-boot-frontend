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
  async deleteById(id) {
    try {
      await fetch(`/products/${id}/`, { method: "DELETE" });
    } catch (e) {
      console.error(e);
    }
  }
  async deleteAll() {
    try {
      await fetch(`/products/`, { method: "DELETE" });
    } catch (e) {
      console.error(e);
    }
  }
}

export default ProductService;

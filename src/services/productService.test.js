import ProductService from "./productService";
import fakeApiResponse from "../utils/fakeApiResponse";

describe("#productService", () => {
  const productService = new ProductService();

  describe("#createProduct", () => {
    test("calls the API correctly", async () => {
      const product = {
        id: 1,
        title: "Konsole",
        name: "Playstation 5",
        description:
          "Die PlayStation ist eine Spielkonsole des japanischen Konzerns Sony",
      };

      jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve());

      await productService.createProduct(product);
      expect(global.fetch).toHaveBeenCalledWith("/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    });
  });

  describe("#get", () => {
    test("calls the API correctly", async () => {
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        })
      );

      await productService.get();
      expect(global.fetch).toHaveBeenCalledWith("/products/");
    });

    test("returns the products", async () => {
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(fakeApiResponse),
        })
      );

      const result = await productService.get();
      expect(result).toBe(fakeApiResponse);
    });
  });

  describe("#deleteById", () => {
    test("calls the API correctly", async () => {
      jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve());
      const id = 3;

      await productService.deleteById(id);
      expect(global.fetch).toHaveBeenCalledWith(`/products/${id}/`, {
        method: "DELETE",
      });
    });
  });

  describe("#deleteAll", () => {
    test("calls the API correctly", async () => {
      jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve());

      await productService.deleteAll();
      expect(global.fetch).toHaveBeenCalledWith("/products/", {
        method: "DELETE",
      });
    });
  });

  describe("#updateProduct", () => {
    const product = fakeApiResponse[0];

    test("calls the API correctly", async () => {
      jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve());

      await productService.updateProduct(product);
      expect(global.fetch).toHaveBeenCalledWith("/products/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    });
  });
});

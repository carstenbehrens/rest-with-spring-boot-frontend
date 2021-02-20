import findProductById from "./findProductById";

describe("#findProductsById", () => {
  const products = [
    {
      id: 1,
      title: "Konsole",
      name: "Playstation 5",
      description:
        "Die PlayStation ist eine Spielkonsole des japanischen Konzerns Sony",
    },
    {
      id: 9,
      title: "Konsole",
      name: "Nintendo Switch",
      description:
        "Die Nintendo Switch ist eine Spielkonsole des japanischen Herstellers Nintendo.",
    },
  ];

  test("Finds the correct product", () => {
    const result = findProductById(products, 9);
    expect(result).toBe(products[1]);
  });
});

export interface ShoppingProduct {
      _id: string;
      productName: string;
      urlImage: string;
      measureType: "Lb" | "Kg" | "Und" | "notSet";
      price: number;
      salving: number;
      quantity: number;
      totalAmount:number;
}

export interface ShoppingOrder {
  products: [
    ShoppingProduct
  ],
  salvings:number;
  total: number;
}

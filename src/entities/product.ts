export interface Product {
  _id: string;
  enabled: boolean;
  keyImage: string;
  measureType: "Lb" | "Kg" | "Und" | "notSet";
  price: number;
  productName: string;
  productType: string;
  provider: string;
  totalAmount: number;
  urlImage: string;
  code?: number;
  brand?: string;
  features?: string;
  promotionPrice?: number;
  promotionExpires: Date;
  quantity?: number;
}

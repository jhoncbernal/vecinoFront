export interface Bill {
  billType: string;
  deliveryCharge: number;
  deliveryExtraCharge: number;
  MethodOfPayment: string;
  subTotal: number;
  DeliverySchedule: string;
  Total: number;
  cashValue: number;
  change: number;
  enabled: boolean;
  state: string;
  code: string;
  otherAddress: string;
  products: ProductBill;
  user: {
    _id:string;
    firstName: string;
    phone: number;
    email: string;
    homenumber: number;
    blocknumber: number;
    neighborhood: string;
  };
  provider: {
    _id:string;
    firstName: string;
    documentId: number;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
interface ProductBill {
  productName: string;
  measureType: string;
  quantity: number;
  urlImage: string;
  price: number;
  salving: number;
}

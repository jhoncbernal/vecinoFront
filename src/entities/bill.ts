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
  states: [{start:string,state:string}];
  code: string;
  otherAddress: string;
  tip:number;
  products: [ProductBill];
  user: {
    _id: string;
    firstName: string;
    phone: number;
    email: string;
    homeNumber: number;
    blockNumber: number;
    neighborhood: {firstName:string,address:string};
  };
  provider: {
    _id: string;
    firstName: string;
    documentId: number;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductBill {
  _id:string
  productName: string;
  measureType: string;
  quantity: number;
  urlImage: string;
  price: number;
  salving: number;
}

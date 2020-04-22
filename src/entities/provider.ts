export interface Provider {
  _id?: string;
  username: string;
  email: string;
  enabled: string;
  roles: Array<string>;
  firstName: string;
  lastName?: string;
  documentId: string;
  phone: number;
  address: string;
  category: string;
  uniquecode: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  isVerified?: string;
  deliveryCharge: number;
  deliveryExtraCharge: number;
  schedule: [ProviderSchedule];
  billType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderListItem {
  _id?: string;
  firstName: string;
  uniquecode: string;
  category: string;
  deliveryCharge: number;
  deliveryExtraCharge: number;
  schedule: [ProviderSchedule];
  billType: string;
  urlImage: string;
}

interface ProviderSchedule
  {
    days: Array<string>;
    open: Date;
    close: Date;
  }

  
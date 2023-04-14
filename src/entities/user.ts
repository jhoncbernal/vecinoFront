export interface User {
  _id?: string;
  username: string;
  email: string;
  enabled: boolean;
  roles: Array<string>;
  firstName: string;
  lastName?: string;
  documentId: string;
  phone: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  isVerified?: boolean;
  fireToken?: string;

  uniquecode: string;
  address: string;
  city: string;
  propertyInfo: {
    sectionNumber: string;
    propertyNumber: string;
  };
  points: Number;
  isOwner?: boolean;
  debt?: string;
  payOnTime?: boolean;
  count?: number;
  averagePoints?: number;
  acceptPolicity: boolean;
  neighborhood: {
    firstName: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
export  interface User {
    _id?: string;
    username: string;
    email: string;
    enabled:string;
    roles: Array<string>;
    firstName: string;
    lastName?: string;
    documentId: string;
    phone: number;
    resetPasswordToken?: string;
    resetPasswordExpires?: string;
    isVerified?: string;
    fireToken?: string;

    uniquecode:string;
    homeNumber:number;
    blockNumber:number;
    points:Number;
    isOwner?:boolean;
    debt?:string;
    payOnTime?:boolean;
    count?:number;
    averagePoints?:number;
    neighborhood:{
        firstName:string;
        address:string;
    }
    createdAt:Date;
    updatedAt:Date;

  }
export interface Payment{
    id:Number
    customerId:Number,
    cardNumber:string;
    expiryMonth: Number;
    expiryYear: Number;
    cvv: string;
    fullName:string;
}



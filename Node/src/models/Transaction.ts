export class Transaction {
    amount: number;
    user: string;
    password: string;
    hash: string;
    datetime: Date;
    constructor(
        amount: number, 
        user: string, 
        password: string, 
        hash: string,
        datetime: Date)
    {
        this.amount = amount;        
        this.user = user;
        this.password =  password;
        this.hash = hash;        
        this.datetime = datetime;            
    }
}

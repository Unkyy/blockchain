class Block {
    date: Date;
    hash: String = '';
    preHash: String;
    nonce: String;
    transactions: Array<Transaction> = [];
    constructor(date: Date , preHash: string, nonce: string){
        this.date = date;
        this.preHash = preHash;
        this.nonce = nonce;
    }
}
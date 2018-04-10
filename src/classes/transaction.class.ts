export class Transaction {
  constructor(
    public timestamp: number,
    public payerAddress: string,
    public payeeAddress: string,
    public amount: number = 0
  ) {}
}

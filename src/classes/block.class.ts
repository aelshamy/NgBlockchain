import * as SHA256 from 'crypto-js/sha256';
import { Transaction } from './transaction.class';
export class Block {
  hash: string = null;
  nonce = 0;

  constructor(
    public timestamp: number,
    public transactions: Transaction[] = [],
    public previousHash: string = null
  ) {
    this.hash = this.calculateHash();
  }
  calculateHash(): string {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }
  mineBlock(difficulty: number): Promise<any> {
    const promise = new Promise((reslove, reject) => {
      while (
        this.hash.substr(0, difficulty) !== Array(difficulty + 1).join('0')
      ) {
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.log(
        `block succesfully hashed (${this.nonce} iterations). Hash ${this.hash}`
      );
      reslove();
    });
    return promise;
  }
}

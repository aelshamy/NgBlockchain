import * as SHA256 from 'crypto-js/sha256';
import { Block } from './block.class';
import { Transaction } from './transaction.class';

export class Blockchain {
  chain: Block[] = [];
  difficulty = 3;
  miningReward = 50;
  registeredAdresses: string[] = [];

  constructor() {
    this.createGensisBlock();
    this.registeredAdresses = [
      'wallet-Alice',
      'wallet-Bob',
      'wallet-Charlie',
      'wallet-Miner49r'
    ];
    this.airDropCoins(100);
  }

  airDropCoins(conins: number) {
    const airDropTransactions: Transaction[] = this.registeredAdresses.map(
      address => new Transaction(Date.now(), 'mint', address, conins)
    );

    this.mineCurrentBlock('wallet-Miner49r', airDropTransactions);
  }

  createGensisBlock() {
    const transaction = new Transaction(Date.now(), 'mint', 'gensis', 0);
    const block = new Block(Date.now(), [transaction], '0');
    this.chain.push(block);
  }
  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }
  // addBlock(newBlock: Block) {
  //   newBlock.previousHash = this.getLatestBlock().hash;
  //   newBlock.mineBlock(this.difficulty);
  //   this.chain.push(newBlock);
  // }
  mineCurrentBlock(
    minerAddress: string,
    transactions: Transaction[]
  ): Promise<any> {
    const validTransactions = transactions.filter(
      transaction =>
        transaction.payerAddress === 'mint' ||
        this.validateTransaction(transaction)
    );

    console.log(validTransactions);

    validTransactions.push(
      new Transaction(Date.now(), 'mint', minerAddress, this.miningReward)
    );
    const promise = new Promise((reslove, reject) => {
      const block = new Block(
        Date.now(),
        validTransactions,
        this.getLatestBlock().hash
      );
      block.mineBlock(this.difficulty).then(() => {
        console.log('Current Block successfully mined...');
        this.chain.push(block);
        reslove();
      });
    });
    return promise;
  }

  validateTransaction(transaction: Transaction): boolean {
    const payerAddress = transaction.payerAddress;
    const balance = this.getAddressBalance(payerAddress);
    return balance >= transaction.amount;
  }

  getAddressBalance(address: string): number {
    let balance = 0;
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.payerAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.payeeAddress === address) {
          balance += transaction.amount;
        }
      }
    }
    return balance;
  }

  isValidchain(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // validate data integrity
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      // validate hash chain link
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
  recieveTransaction(transaction: Transaction) {
    this.mineCurrentBlock('Miner49r', [transaction]);
  }
}

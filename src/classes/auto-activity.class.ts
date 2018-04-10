import { Blockchain } from './blockchain.class';
import { Transaction } from './transaction.class';

export class AutoActivity {
  timerHandle;
  currentPayerAddress = '';
  currentPayeeAddress = '';
  currentCoinAmount = 0;

  constructor(public blockchain: Blockchain) {
    this.timerHandle = setInterval(() => {
      this.transactionTrigger();
    }, 20000);
  }

  transactionTrigger() {
    this.randomizPayer();
    this.randomizPayee();
    this.randomizCoinAmount();
    this.sendTransaction();
  }
  randomizPayer() {
    this.currentPayerAddress = this.blockchain.registeredAdresses[
      Math.floor(Math.random() * this.blockchain.registeredAdresses.length)
    ];
  }

  randomizPayee() {
    let payee = '';
    while (payee === '' || payee === this.currentPayeeAddress) {
      payee = this.blockchain.registeredAdresses[
        Math.floor(Math.random() * this.blockchain.registeredAdresses.length)
      ];
    }
    this.currentPayeeAddress = payee;
  }
  randomizCoinAmount() {
    this.currentCoinAmount = Math.floor(Math.random() * 50) + 1;
  }
  sendTransaction() {
    const transaction = new Transaction(
      Date.now(),
      this.currentPayerAddress,
      this.currentPayeeAddress,
      this.currentCoinAmount
    );
    this.blockchain.recieveTransaction(transaction);
  }
}

import { Injectable, transition } from '@angular/core';
import { Blockchain } from '../../classes/blockchain.class';
import { Block } from '../../classes/block.class';
import { Transaction } from '../../classes/transaction.class';
import { AutoActivity } from '../../classes/auto-activity.class';

@Injectable()
export class CryptoService {
  cryptoChain = new Blockchain();
  unminedTransactions: Transaction[] = [];
  autoActivity: AutoActivity;
  constructor() {
    this.autoActivity = new AutoActivity(this.cryptoChain);
  }
}

import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Wallet } from '../classes/wallet.class';
import { Blockchain } from '../classes/blockchain.class';
import { Transaction } from '../classes/transaction.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  walletAddressForm: FormGroup;
  sendCoinsForm: FormGroup;

  blockchain: Blockchain;
  balance = 0;
  wallet: Wallet;
  constructor(public cryptoSrv: CryptoService, private fb: FormBuilder) {
    this.walletAddressForm = this.fb.group({
      walletAddress: ['', Validators.required]
    });
    this.sendCoinsForm = this.fb.group({
      recieverAddress: ['', Validators.required],
      transactionAmount: ['', Validators.required]
    });
    this.blockchain = this.cryptoSrv.cryptoChain;
    this.wallet = new Wallet();
  }

  assignWalletAddress(e) {
    this.wallet.assignWalletAddress(this.walletAddressForm.value.walletAddress);
  }
  getCurrentBalance() {
    this.balance = this.blockchain.getAddressBalance(this.wallet.address);
  }
  sendTransaction() {
    const transaction = new Transaction(
      Date.now(),
      this.wallet.address,
      this.sendCoinsForm.value.recieverAddress,
      this.sendCoinsForm.value.transactionAmount
    );
    this.blockchain.recieveTransaction(transaction);
  }
}

export class Wallet {
  address = '';
  balance = 0;

  assignWalletAddress(address: string) {
    this.address = address;
    console.log(`Assigned ${address} to the wallet`);
  }
}

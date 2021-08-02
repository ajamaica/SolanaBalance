# SolanaBalance

This is the Solana Balance App writen in Typescrypt for React Native. It retrives balances from all SPL Wallets by the given PublicKey. If the given key is not valid it will show an error. If you tap the item it will open a qr code with the pubkey on a browser. The SPL tokens are sort by chainId. Images are and metadata is loaded using the token-list.

## Usage

1. Clone repo
2. Resolve dependencies (yarn install)
3. yarn start

## Remarks

The original idea was to use solana web3.js for all the rpc and publickey code but the library is not fully compatible with React-Native iOS. I rewrite the networking part (with limited time) and the Borsh parsing so it can be truly multiplatform. It work but some code still can be remove to avoid duplication. I tests some critical parts of this implementation.
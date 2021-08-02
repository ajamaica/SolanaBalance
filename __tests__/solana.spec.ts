import { PublicKey } from "@solana/web3.js";
import { Solana } from "../vendor/solana/solana";

// Hack to mock fetch. I can mock it but I dont have much time
global.fetch = require('node-fetch');

describe('Solana Tests', () => {
    test('get Balance', async () => {
        const solana = new Solana({ enviroment : 'mainnet-beta', endpoint: 'https://api.mainnet-beta.solana.com/' })
        const walletTokens = await solana.getBalance("26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo")
        expect(walletTokens).toBeGreaterThan(0)
    });
    test('get Wallet Tokens', async () => {
        const solana = new Solana({ enviroment : 'mainnet-beta', endpoint: 'https://api.mainnet-beta.solana.com/' })
        const walletTokens = await solana.getWalletTokens("26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo")
        expect(walletTokens[0].chainId).toEqual(0)
    });

    test('valid publicKey', async () => {
        const publicKey = new PublicKey("26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo")
        expect(publicKey.toBase58()).toEqual("26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo")
    });
     
    test('invalid publicKey', async () => {
        try {
            const publicKey = new PublicKey("XXXXXXX")
            expect(publicKey).toBeUndefined()
        } catch (error) {
            expect(error).toBeDefined()
        }
    });
});

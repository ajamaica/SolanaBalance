import { TokenInfo } from "@solana/spl-token-registry"
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { deserialize } from "borsh"
import { SolanaName, SolanaImageURL, SolanaSymbol } from "../../../utils/AppConst"
import { RPC } from "../rpc"
import BN from "bn.js"
import { Buffer } from "buffer"

class Action {
    _rpc: RPC
    constructor(rpc: RPC){
        this._rpc = rpc
    }
    
    getWalletTokens = async (address: PublicKey, tokenMap: Map<String, TokenInfo>) => {
    
        // Get Solana Balance
        const balance = await this._rpc.getBalance(address)
    
        // Get Solana ProgramAccounts
        const accounts = await this._rpc.getProgramAccounts(address)
    
        // Map the spl mint address with the token list and append SOL account.
        // I map it because I dont want to expose the solana lib object.
        const tokenWallets = accounts.flatMap((account, index) => {
            const decodedData = account.account.data[0]
            const accountInfo = deserialize(AccountInfoSchema, AccountInfoData, Buffer.from(decodedData, 'base64'));
            const pubKey = new PublicKey(accountInfo.mint).toBase58()
            const token = tokenMap.get(pubKey)
    
            return {
                chainId: token?.chainId ?? Number.MAX_SAFE_INTEGER,
                pubkey: account.pubkey,
                mint: pubKey,
                lamports: accountInfo.lamports.toString(),
                name: token?.name ?? pubKey,
                logoURI: token?.logoURI,
                symbol: token?.symbol,
            }
        }).concat({
            chainId: 0,
            pubkey: address.toBase58(),
            mint: '',
            lamports: balance / LAMPORTS_PER_SOL,
            name: SolanaName,
            logoURI: SolanaImageURL,
            symbol: SolanaSymbol,
        })
        // Sort by chainId
        return tokenWallets.sort((n1, n2) => n1.chainId - n2.chainId)
    }
}
export { Action }

class AccountInfoData {
    mint: number[];
    owner: number[];
    lamports: BN;
    delegateOption: number;
    delegate?: number[];
    state: number;
    isNativeOption: number;
    isNativeRaw: number;
    delegatedAmount: number;
    closeAuthorityOption: number;
    closeAuthority?: number[];

    constructor(properties: {
        mint: number[],
        owner: number[],
        lamports: BN,
        delegateOption: number,
        delegate?: number[],
        state: number,
        isNativeOption: number,
        isNativeRaw: number,
        delegatedAmount: number,
        closeAuthorityOption: number,
        closeAuthority?: number[]
    }) {
        this.mint = properties.mint
        this.owner = properties.owner
        this.lamports = properties.lamports
        this.delegateOption = properties.delegateOption
        this.delegate = properties.delegate
        this.state = properties.state
        this.isNativeOption = properties.isNativeOption
        this.isNativeRaw = properties.isNativeRaw
        this.delegatedAmount = properties.delegatedAmount
        this.closeAuthorityOption = properties.closeAuthorityOption
        this.closeAuthority = properties.closeAuthority
    }
}

// Borsh Template
const AccountInfoSchema = new Map(
    [
        [AccountInfoData, {
            kind: 'struct', fields: [
                ['mint', [32]],
                ['owner', [32]],
                ['lamports', 'u64'],
                ['delegateOption', 'u32'],
                ['delegate', [32]],
                ['state', 'u8'],
                ['isNativeOption', 'u32'],
                ['isNativeRaw', 'u64'],
                ['delegatedAmount', 'u64'],
                ['closeAuthorityOption', 'u32'],
                ['closeAuthority', [32]],
            ]
        }]
    ]
);
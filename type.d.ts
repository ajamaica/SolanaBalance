export interface WalletToken {
    chainId: number,
    pubkey: string;
    mint: string;
    lamports: string;
    name?: string,
    logoURI?: string,
    symbol?: string,
}

export interface SolanaEnviroment {
    enviroment: 'devnet' | 'testnet' | 'mainnet-beta';
    endpoint: string;
}

export interface RPCResponse<Response> {
    jsonrpc: '2.0',
    id: string,
    result: Response,
}

export interface ProgramAccount {
    pubkey: string,
    account: {
        executable: boolean,
        owner: string,
        lamports: number,
        data: Array<String>,
        rentEpoch: number,
    }
}
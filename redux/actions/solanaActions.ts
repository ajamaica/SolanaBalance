import { Solana } from "../../vendor/solana/solana";

export interface GetSolana {
    readonly type: 'GET_SOLANA'
    payload: Solana;
}

export type SolanaAction = GetSolana

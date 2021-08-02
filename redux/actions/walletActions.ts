import { Dispatch } from "react";
import { WalletToken } from "../../type";
import { Solana } from "../../vendor/solana/solana";

export interface GetTokenWalletAction {
    readonly type: 'GET_TOKEN_WALLET'
    payload: WalletToken[]
}

export interface ErrorAction {
    readonly type: 'ON_ERROR'
    payload: any
}


export type WalletAction = GetTokenWalletAction | ErrorAction

export const getTokens = (address: string, solana: Solana) => {
    return async (dispatch: Dispatch<WalletAction>) => {
        try {
            const wallets = await solana.getWalletTokens(address);
            dispatch({
                type: 'ON_ERROR',
                payload: null
            })
            dispatch({
                type: 'GET_TOKEN_WALLET',
                payload: wallets
            })
        } catch (error) {
            dispatch({
                type: 'GET_TOKEN_WALLET',
                payload: []
            })
            dispatch({
                type: 'ON_ERROR',
                payload: `${error}`
            })
        }
        
    }
}
import { Solana } from "../../vendor/solana/solana";
import { SolanaAction } from "../actions/solanaActions";

type SolanaState = {
    solana: Solana;
    error: string | undefined;
}

const initialState = {
    solana: new Solana( { enviroment: 'mainnet-beta', endpoint: 'https://api.mainnet-beta.solana.com/' }),
    error: undefined
}

const SolanaReducer = (state: SolanaState = initialState, action: SolanaAction) => {
    switch (action.type) {
        case 'GET_SOLANA':
            return {
                ...state,
                enviroment: action.payload,
            }
        default:
            return state;
    }
}

export { SolanaReducer }
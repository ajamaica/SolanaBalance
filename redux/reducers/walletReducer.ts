import { WalletToken } from "../../type";
import { WalletAction } from "../actions/walletActions";

type WalletState = {
    tokens: WalletToken[];
    error: string | undefined;
}

const initialState = {
    tokens: [],
    error: undefined
}

const WalletReducer = (state: WalletState = initialState, action: WalletAction) => {
    switch (action.type) {
        case 'GET_TOKEN_WALLET':
            return {
                ...state,
                tokens: action.payload,
            }
        case 'ON_ERROR':
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}

export { WalletReducer }
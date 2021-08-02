import { combineReducers } from "redux";
import { SolanaReducer } from "./solanaReducer";
import { WalletReducer } from './walletReducer'

const rootReducer = combineReducers({
    walletReducer: WalletReducer,
    solanaReducer: SolanaReducer,
})

export type  ApplicationState = ReturnType<typeof rootReducer>
export { rootReducer }
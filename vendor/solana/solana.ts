import { TokenListProvider } from "@solana/spl-token-registry";
import { PublicKey } from "@solana/web3.js";
import { SolanaEnviroment } from "../../type";
import { Action } from "./actions";
import { RPC } from "./rpc";

export class Solana {
    solEnviroment: string
    endpoint: string
    _rpc: RPC
    _actions: Action
    constructor(enviroment: SolanaEnviroment){
        this.solEnviroment = enviroment.enviroment
        this.endpoint = enviroment.endpoint
        this._rpc = new RPC(enviroment.endpoint)
        this._actions = new Action(this._rpc)
    }

    getTokenList = async () => {
        const tokenSolver = new TokenListProvider();
        const tokens = await tokenSolver.resolve();
        const tokenList = tokens.filterByClusterSlug(this.solEnviroment).getList();
    
        return tokenList.reduce((map, item) => {
            map.set(item.address, item);
            return map;
        }, new Map());
    }

    getWalletTokens = async (address: string) => {
        // Check the publickey
        const publicKey = new PublicKey(address);   
        // Get Tokens
        const tokenMap = await this.getTokenList()
        return this._actions.getWalletTokens(publicKey, tokenMap)
    }

    getBalance = async (address: string) => {
        // Check the publickey
        const publicKey = new PublicKey(address);   
        // get publicKey
        return this._rpc.getBalance(publicKey)
    }
}

import { PublicKey } from '@solana/web3.js';
import { ProgramAccount, RPCResponse } from '../../../type';
import { TokenProgramAddress } from '../programs/tokenProgram';

class RPC {
    _endpoint: string
    constructor(endpoint: string) {
        this._endpoint = endpoint
    }

    getProgramAccounts = async (publicKey: PublicKey) => {
        const response = await fetch(this._endpoint, {
            method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getProgramAccounts",
                "params": [
                    TokenProgramAddress.toBase58(),
                    {
                        "encoding": "base64",
                        "filters": [
                            {
                                "dataSize": 165
                            },
                            {
                                "memcmp": {
                                    "offset": 32,
                                    "bytes": publicKey.toBase58()
                                }
                            }
                        ]
                    }
                ]
            })
        });
        const json = await response.json() as RPCResponse<Array<ProgramAccount>>;
        return json.result;
    }

    getBalance = async (publicKey: PublicKey) => {
        const response1 = await fetch(this._endpoint, {
            method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [publicKey.toBase58()]
            })
        });
        const json2 = await response1.json() as RPCResponse<{ value: number; }>;
        return json2.result.value;
    }

}

export { RPC }
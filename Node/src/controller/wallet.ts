import { IncomingMessage, ServerResponse } from "http"
import { Client } from "../core/Client"
import wallet from "../models/Wallet"

export const getWalletController = async (req: IncomingMessage, res: ServerResponse, client: Client) => {
    res.write(JSON.stringify(wallet))
    res.end()
}
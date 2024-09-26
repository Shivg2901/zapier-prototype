import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction, Connection } from "@solana/web3.js";
import base58 from "bs58";

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/Qkywo_PZiC88nlPtz2jrtGy4DCZVf-sC", "confirmed");

export async function sendSol(to: string, amount: string) {
    const keypair = Keypair.fromSecretKey(base58.decode((process.env.SOL_PRIVATE_KEY ?? "")));
    console.log(keypair.publicKey);

    const retryLimit = 5;
    let retries = 0;

    while (retries < retryLimit) {
        try {
            const latestBlockhash = await connection.getLatestBlockhash('finalized');

            const transferTransaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            transferTransaction.recentBlockhash = latestBlockhash.blockhash;
            transferTransaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight + 150;

            const signature = await sendAndConfirmTransaction(
                connection,
                transferTransaction,
                [keypair],
                {
                    skipPreflight: true,
                    preflightCommitment: 'processed',
                    //@ts-ignore
                    confirmation: 'confirmed',
                    maxRetries: 5,
                }
            );

            console.log("SOL sent! Signature:", signature);
            return;
        } catch (error) {
            //console.error(`Attempt ${retries + 1} failed:`, error);
            retries++;
            //if (retries >= retryLimit) {
                //throw new Error(`Failed to send SOL after ${retryLimit} attempts`);
            //}
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}
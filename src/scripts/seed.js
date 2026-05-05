import "dotenv/config";
import { connectDb } from "../db/connectDb.js";
import { CryptoAsset } from "../models/CryptoAsset.js";

const sample = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 65000,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    change24h: 1.2
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3200,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    change24h: -0.7
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 145,
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    change24h: 3.9
  }
];

async function main() {
  await connectDb(process.env.MONGODB_URI);

  for (const asset of sample) {
    await CryptoAsset.updateOne({ symbol: asset.symbol }, { $set: asset }, { upsert: true });
  }

  // eslint-disable-next-line no-console
  console.log(`Seeded ${sample.length} crypto assets`);
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


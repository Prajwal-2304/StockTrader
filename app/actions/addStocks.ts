'use server'
import db from "@/db/index"
const stocks = [
    { ticker: "BTC", name: "Bitcoin", supply: 19462000, chain: "Bitcoin" },
    { ticker: "ETH", name: "Ethereum", supply: 120430000, chain: "Ethereum" },
    { ticker: "BNB", name: "Binance Coin", supply: 153856150, chain: "Binance Smart Chain" },
    { ticker: "USDT", name: "Tether", supply: 83000000000, chain: "Multiple" },
    { ticker: "ADA", name: "Cardano", supply: 35045020830, chain: "Cardano" },
    { ticker: "DOGE", name: "Dogecoin", supply: 140800000000, chain: "Dogecoin" },
    { ticker: "XRP", name: "XRP", supply: 99991958700, chain: "XRP Ledger" },
    { ticker: "SOL", name: "Solana", supply: 400000000, chain: "Solana" },
    { ticker: "DOT", name: "Polkadot", supply: 1400000000, chain: "Polkadot" },
    { ticker: "MATIC", name: "Polygon", supply: 10000000000, chain: "Polygon" },
    { ticker: "SHIB", name: "Shiba Inu", supply: 589735030408322, chain: "Ethereum" },
    { ticker: "LTC", name: "Litecoin", supply: 84000000, chain: "Litecoin" },
    { ticker: "UNI", name: "Uniswap", supply: 1000000000, chain: "Ethereum" },
    { ticker: "AVAX", name: "Avalanche", supply: 720000000, chain: "Avalanche" },
    { ticker: "LINK", name: "Chainlink", supply: 1000000000, chain: "Ethereum" },
    { ticker: "ATOM", name: "Cosmos", supply: 366199600, chain: "Cosmos" },
    { ticker: "XLM", name: "Stellar", supply: 50001800000, chain: "Stellar" },
    { ticker: "TRX", name: "TRON", supply: 91173627460, chain: "TRON" },
    { ticker: "ETC", name: "Ethereum Classic", supply: 210700000, chain: "Ethereum Classic" },
    { ticker: "ALGO", name: "Algorand", supply: 10000000000, chain: "Algorand" },
];
  

  export async function  addStocks(){
            try{
                await db.stock.createMany({
                    data:stocks,
                    skipDuplicates:true
                })
                console.log("Stocks inserted");
            }catch{
                console.log("Error inserting stocks")
            }
  }

  
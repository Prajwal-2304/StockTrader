'use server'
import db from "@/db/index"
const stocks = [
    { ticker: "AAPL", name: "Apple Inc", marketcap: 3479.15, type: "technology" },
    { ticker: "MSFT", name: "Microsoft Corp", marketcap: 2530.23, type: "technology" },
    { ticker: "GOOGL", name: "Alphabet Inc", marketcap: 1915.67, type: "technology" },
    { ticker: "AMZN", name: "Amazon.com Inc", marketcap: 1378.34, type: "consumer" },
    { ticker: "TSLA", name: "Tesla Inc", marketcap: 834.23, type: "automotive" },
    { ticker: "NVDA", name: "NVIDIA Corp", marketcap: 720.45, type: "technology" },
    { ticker: "META", name: "Meta Platforms Inc", marketcap: 615.22, type: "technology" },
    { ticker: "BRK.A", name: "Berkshire Hathaway Inc", marketcap: 545.12, type: "finance" },
    { ticker: "V", name: "Visa Inc", marketcap: 511.36, type: "finance" },
    { ticker: "JNJ", name: "Johnson & Johnson", marketcap: 500.45, type: "healthcare" },
    { ticker: "WMT", name: "Walmart Inc", marketcap: 433.21, type: "consumer" },
    { ticker: "PG", name: "Procter & Gamble Co", marketcap: 405.76, type: "consumer" },
    { ticker: "JPM", name: "JPMorgan Chase & Co", marketcap: 398.32, type: "finance" },
    { ticker: "UNH", name: "UnitedHealth Group Inc", marketcap: 394.28, type: "healthcare" },
    { ticker: "MA", name: "Mastercard Inc", marketcap: 390.87, type: "finance" },
    { ticker: "HD", name: "Home Depot Inc", marketcap: 372.45, type: "consumer" },
    { ticker: "XOM", name: "Exxon Mobil Corp", marketcap: 358.92, type: "energy" },
    { ticker: "CVX", name: "Chevron Corp", marketcap: 350.34, type: "energy" },
    { ticker: "KO", name: "Coca-Cola Co", marketcap: 330.56, type: "consumer" },
    { ticker: "PEP", name: "PepsiCo Inc", marketcap: 320.89, type: "consumer" },
    { ticker: "PFE", name: "Pfizer Inc", marketcap: 310.12, type: "healthcare" },
    { ticker: "CSCO", name: "Cisco Systems Inc", marketcap: 290.76, type: "technology" },
    { ticker: "ADBE", name: "Adobe Inc", marketcap: 287.45, type: "technology" },
    { ticker: "NFLX", name: "Netflix Inc", marketcap: 270.32, type: "consumer" },
    { ticker: "INTC", name: "Intel Corp", marketcap: 250.87, type: "technology" },
    { ticker: "MRK", name: "Merck & Co Inc", marketcap: 247.19, type: "healthcare" },
    { ticker: "T", name: "AT&T Inc", marketcap: 240.45, type: "communication" },
    { ticker: "BAC", name: "Bank of America Corp", marketcap: 230.67, type: "finance" },
    { ticker: "DIS", name: "Walt Disney Co", marketcap: 225.34, type: "consumer" },
    { ticker: "CMCSA", name: "Comcast Corp", marketcap: 215.87, type: "communication" },
    { ticker: "ABBV", name: "AbbVie Inc", marketcap: 210.12, type: "healthcare" },
    { ticker: "AMGN", name: "Amgen Inc", marketcap: 205.89, type: "healthcare" },
    { ticker: "TMO", name: "Thermo Fisher Scientific Inc", marketcap: 198.45, type: "healthcare" },
    { ticker: "ORCL", name: "Oracle Corp", marketcap: 190.67, type: "technology" },
    { ticker: "COST", name: "Costco Wholesale Corp", marketcap: 185.45, type: "consumer" },
    { ticker: "QCOM", name: "Qualcomm Inc", marketcap: 182.12, type: "technology" },
    { ticker: "NKE", name: "Nike Inc", marketcap: 178.67, type: "consumer" },
    { ticker: "CRM", name: "Salesforce Inc", marketcap: 170.45, type: "technology" },
    { ticker: "LLY", name: "Eli Lilly and Co", marketcap: 167.32, type: "healthcare" },
    { ticker: "PM", name: "Philip Morris International", marketcap: 160.45, type: "consumer" },
    { ticker: "UPS", name: "United Parcel Service", marketcap: 155.12, type: "logistics" },
    { ticker: "BA", name: "Boeing Co", marketcap: 150.89, type: "aerospace" },
    { ticker: "MDT", name: "Medtronic PLC", marketcap: 145.34, type: "healthcare" },
    { ticker: "BMY", name: "Bristol-Myers Squibb", marketcap: 140.12, type: "healthcare" },
    { ticker: "CAT", name: "Caterpillar Inc", marketcap: 135.76, type: "manufacturing" },
    { ticker: "RTX", name: "Raytheon Technologies", marketcap: 130.45, type: "aerospace" },
    { ticker: "GS", name: "Goldman Sachs Group Inc", marketcap: 125.32, type: "finance" },
    { ticker: "LMT", name: "Lockheed Martin Corp", marketcap: 120.45, type: "aerospace" },
    { ticker: "SPGI", name: "S&P Global Inc", marketcap: 115.67, type: "finance" },
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

  
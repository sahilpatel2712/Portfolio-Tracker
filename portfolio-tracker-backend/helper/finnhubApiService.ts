import axios from "axios";

export const finnhubApiService = async (ticker: string) => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_TOKEN}`
  );
  return response;
};

export const searchFinnhubSocks = async (query: string, exchange: string) => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/search?q=${query}&exchange=${exchange}&token=${process.env.FINNHUB_TOKEN}`
  );
  return response;
};
export const stocksDataArray = async (TimeSeries: string, symbol: string) => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=${TimeSeries}&symbol=${symbol}&apikey=${process.env.ALPHA_TOKEN}`
  );
  return response;
};

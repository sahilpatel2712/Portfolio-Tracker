import axios from "axios";

export const finnhubApiService = async (ticker: string) => {
  const response = await axios.get(
    `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_TOKEN}`
  );
  return response;
};

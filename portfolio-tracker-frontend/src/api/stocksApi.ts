import axios from "axios";
import { errorToast } from "../utils/toast";

export const searchStock = async (
  searchText: string,
  fetchData: boolean,
  navigation: (path: string) => void
) => {
  try {
    const token = localStorage.getItem("userAuthToken");
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }api/v1/stock/search?q=${searchText}&data=${fetchData}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorToast(error.response?.data?.message || error?.message);
      const statusCode = error.response?.status;
      if (statusCode === 401) {
        localStorage.removeItem("userAuthToken");
        navigation("/signin");
      }
    }
  }
};

export const getStockData = async (
  ticker: string,
  navigation: (path: string) => void
) => {
  if (ticker && ticker.trim()) {
    try {
      const token = localStorage.getItem("userAuthToken");
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}api/v1/stock/data?ticker=${ticker}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorToast(error.response?.data?.message || error?.message);
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          localStorage.removeItem("userAuthToken");
          navigation("/signin");
        }
        return null;
      }
    }
  }
  return null;
};

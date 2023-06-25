import apiClient from "../utils/http.util";
import { API_URL } from "../constants/system.constant";
import { replaceAll } from "../utils/common.util";

export type BidInputType = {
  amount: number;
};

class BidService {
  static async bid(itemId: number, dataForm: BidInputType) {
    try {
      const data = await apiClient.post(
        replaceAll(API_URL.bid.create, {
          itemId,
        }),
        { ...dataForm }
      );
      return data;
    } catch (error) {
      throw new Error("Bid failed");
    }
  }

  static async getItems() {
    try {
      const data = await apiClient.get(API_URL.bid.getItems);
      return data;
    } catch (error) {
      throw new Error("Get List Item for Bid failed");
    }
  }
}

export default BidService;

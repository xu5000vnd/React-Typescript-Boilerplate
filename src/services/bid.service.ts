import _ from "lodash";
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
        dataForm
      );
      return data;
    } catch (error) {
      throw new Error("Bid failed");
    }
  }
}

export default BidService;

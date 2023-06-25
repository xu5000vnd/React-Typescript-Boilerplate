import apiClient from "../utils/http.util";
import { API_URL } from "../constants/system.constant";
import { replaceAll } from "../utils/common.util";

export type ItemInputType = {
  name: string;
  startPrice: number;
  timeWindow: number;
};

class ItemService {
  static async add(dataForm: ItemInputType) {
    try {
      const data = await apiClient.post(API_URL.item.create, dataForm);
      return data;
    } catch (error) {
      throw new Error("Add Item failed");
    }
  }

  static async publish(itemId: number) {
    try {
      const data = await apiClient.post(
        replaceAll(API_URL.item.publish, { itemId }),
        {}
      );
      return data;
    } catch (error) {
      throw new Error("Add Item failed");
    }
  }

  static async list() {
    try {
      const data = await apiClient.get(API_URL.item.list);
      return data;
    } catch (error) {
      throw new Error("Get List Item failed");
    }
  }

  static async listBid() {
    try {
      const data = await apiClient.get(API_URL.item.listBid);
      return data;
    } catch (error) {
      throw new Error("Get List Item for Bid failed");
    }
  }

  static async listFinished() {
    try {
      const data = await apiClient.get(API_URL.item.listFinished);
      return data;
    } catch (error) {
      throw new Error("Get List finished Item failed");
    }
  }
}

export default ItemService;

import apiClient from "../utils/http.util";
import { API_URL } from "../constants/system.constant";

export type CreditDepositType = {
  amount: number;
};

class CreditService {
  static async deposit(dataForm: CreditDepositType) {
    try {
      const data = await apiClient.post(API_URL.credit.deposit, dataForm);
      return data;
    } catch (error) {
      throw new Error("Deposit failed");
    }
  }
}

export default CreditService;

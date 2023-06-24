import apiClient from "../utils/http.util";
import { API_URL } from "../constants/system.constant";

class UserService {
  static async getMyProfile() {
    try {
      const data = await apiClient.get(API_URL.user.myProfile);
      return data;
    } catch (error) {
      throw new Error("Get My Profile failed");
    }
  }
}

export default UserService;

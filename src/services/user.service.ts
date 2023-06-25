import apiClient from "../utils/http.util";
import { API_URL } from "../constants/system.constant";
import { replaceAll } from "../utils/common.util";
import { UserProfile } from "../common/types/user.type";
import { wait } from "@testing-library/user-event/dist/utils";
import { getItem } from "../utils/storage.util";
import { STORAGE_KEYS } from "../constants/storage.constant";

class UserService {
  static async getMyProfile() {
    try {
      const data = await apiClient.get(API_URL.user.myProfile);
      return data;
    } catch (error) {
      throw new Error("Get My Profile failed");
    }
  }

  static getUserInfo(): UserProfile | null {
    try {
      const data: UserProfile = getItem(STORAGE_KEYS.USER_INFO);
      return data;
    } catch (error) {
      throw new Error("Get User info failed");
    }
  }

  static async getItems(userId: number) {
    try {
      const data = await apiClient.get(
        replaceAll(API_URL.user.getItems, { userId })
      );
      return data;
    } catch (error) {
      throw new Error("Get My Items failed");
    }
  }
}

export default UserService;

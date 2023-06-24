// export const BASE_URL = process.env.BASE_URL;
export const BASE_URL = "http://localhost:3001";
export const API_URL = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  item: {
    list: "/items",
    listBid: "/items",
    listFinished: "/items",
    detail: "/items/:itemId",
  },
  user: {
    detail: "/users/:userId",
  },
};

export const ROUTING = {
  home: "/",
  dashboard: "/",
  login: "/login",
  signup: "/signup",
  auth: {
    myProfile: "/my-profile",
    items: {
      list: "/items",
      detail: "/items/:itemId",
    },
  },
};

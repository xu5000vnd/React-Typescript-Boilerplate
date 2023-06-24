// export const BASE_URL = process.env.BASE_URL;
export const BASE_URL = "http://localhost:3001";
export const API_URL = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  item: {
    list: "/items",
    listBid: "/items/bid",
    listFinished: "/items/finished",
    detail: "/items/:itemId",
    create: "/items",
  },
  user: {
    detail: "/users/:userId",
    myProfile: "/users/my-profile",
  },
  credit: {
    deposit: "/credit/deposit",
  },
  bid: {
    create: "/bids/item/:itemId",
  },
};

export const ROUTING = {
  home: "/",
  dashboard: "/dashboard",
  login: "/login",
  signup: "/signup",
  logout: "/logout",
  auth: {
    myProfile: "/my-profile",
    items: {
      list: "/items",
      detail: "/items/:itemId",
    },
    credit: {
      deposit: "/credit/deposit",
    },
  },
};

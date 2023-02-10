import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: watchlistReducer,
  },
});

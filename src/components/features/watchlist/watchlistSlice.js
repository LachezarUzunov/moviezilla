import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listService from "./watchlistService";

const list = JSON.parse(localStorage.getItem("list"));

const initialState = {
  list: list ? list : null,
  isListError: false,
  isListSuccess: false,
  isListLoading: false,
  listMessage: "",
};

// Create new watchlist
export const createList = createAsyncThunk(
  "/list/create",
  async (listData, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await listService.createList(listData, token);
    } catch (error) {
      const listMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(listMessage);
    }
  }
);

// Get my watchlist
export const getMyWatchlist = createAsyncThunk(
  "/list/getMine",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listService.getMyList(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.isListLoading = false;
      state.isListError = false;
      state.isListSuccess = false;
      state.listMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isListLoading = true;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.isListSuccess = true;
        state.list = action.payload;
      })
      .addCase(createList.rejected, (state, action) => {
        state.isListLoading = false;
        state.isListError = true;
        state.listMessage = action.message;
      })
      .addCase(getMyWatchlist.pending, (state) => {
        state.isListLoading = true;
      })
      .addCase(getMyWatchlist.fulfilled, (state, action) => {
        state.isListLoading = false;
        state.isListSuccess = true;
        state.list = action.payload;
      })
      .addCase(getMyWatchlist.rejected, (state, action) => {
        state.isListLoading = false;
        state.isListError = true;
        state.listMessage = action.payload;
      });
  },
});

export const { reset } = watchlistSlice.actions;
export default watchlistSlice.reducer;

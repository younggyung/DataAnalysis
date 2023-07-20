import { createSlice } from "@reduxjs/toolkit";
import { GraphDataState } from "../interface/ApiData.interface";

const initialState: GraphDataState = {
  isSearched: false,
  graphData: [],
  loading: false,
  error: null,
};

const graphDataSlice = createSlice({
  name: "graphData",
  initialState,
  reducers: {
    fetchDataRequest: (state, action) => {
      state.formData = action.payload;
      state.loading = true;
      state.error = null;
      state.isSearched = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.graphData = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      alert(`불러올 수 없습니다. 데이터를 잘 입력했는지 확인해주세요`);
    },
  },
});

export const { fetchDataSuccess, fetchDataFailure, fetchDataRequest } =
  graphDataSlice.actions;
export default graphDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type {
  HistogramData,
  HistogramsRequestParams,
} from "~/entities/entities";
import type { RootState } from "./store";

interface InitialState {
  histograms: HistogramData | null;
  searchParams: HistogramsRequestParams | null;
}
const initialState: InitialState = {
  histograms: null,
  searchParams: null,
};
const searchResultsSlice = createSlice({
  name: "searchRes",
  initialState: initialState,
  reducers: {
    setSearchRes: (state, actions) => {
      state.histograms = actions.payload.histograms;
      state.searchParams = actions.payload.searchParams;
    },
  },
});
export const { setSearchRes } = searchResultsSlice.actions;
export const selectHistograms = (state: RootState) =>
  state.searchRes.histograms;
export const selectSearchParams = (state: RootState) =>
  state.searchRes.searchParams;
export default searchResultsSlice.reducer;

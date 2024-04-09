import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBed } from '../types/vegatableBeds';

interface IBedState {
  beds: IBed[] | undefined;
  fetching: boolean;
  error: undefined;
}

const initialState: IBedState = {
  beds: undefined,
  fetching: true,
  error: undefined,
};

export const fetchBeds = createAsyncThunk('beds/getBeds', async () => {
  console.log('fetchBeds');
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/`);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data = await response.json();

  return data;
});

const bedsSlice = createSlice({
  name: 'beds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBeds.fulfilled, (state, action) => {
      state.beds = action.payload;
      state.fetching = false;
      state.error = undefined;
    });
  },
});

export default bedsSlice.reducer;

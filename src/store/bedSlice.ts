import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBed } from '@/types';

interface IBedState {
  beds: IBed[] | undefined;
  fetching: boolean;
  error: string | undefined;
  recentBed?: IBed;
}

const initialState: IBedState = {
  beds: undefined,
  fetching: true,
  error: undefined,
  recentBed: undefined,
};

type IBedWithoutId = Omit<IBed, 'id'>;

export const fetchBeds = createAsyncThunk('beds/fetchBeds', async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/`);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data = await response.json();

  return data;
});

export const deleteBed = createAsyncThunk('beds/deleteBed', async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  return id;
});

export const createBed = createAsyncThunk('beds/createBed', async (bed: IBedWithoutId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bed),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data = await response.json();

  return data;
});

export const updateBed = createAsyncThunk('beds/updateBed', async (bed: IBed) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/beds/${bed.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bed),
  });

  if (!response.ok) {
    throw Error(response.statusText);
  }

  const data = await response.json();

  return data;
});

const bedsSlice = createSlice({
  name: 'beds',
  initialState,
  reducers: {
    clearRecentBed: (state) => {
      state.recentBed = undefined;
    },
  },
  extraReducers: (builder) => {
    // fetch beds
    builder.addCase(fetchBeds.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchBeds.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchBeds.fulfilled, (state, action) => {
      state.beds = action.payload;
      state.fetching = false;
      state.error = undefined;
    });
    // delete bed
    builder.addCase(deleteBed.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(deleteBed.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteBed.fulfilled, (state, action) => {
      state.beds = state.beds?.filter((bed) => bed.id !== action.payload);
      state.fetching = false;
      state.error = undefined;
    });
    // create bed
    builder.addCase(createBed.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(createBed.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.error.message;
    });
    builder.addCase(createBed.fulfilled, (state, action) => {
      state.beds ? state.beds.push(action.payload) : (state.beds = [action.payload]);
      state.recentBed = action.payload;
      state.fetching = false;
      state.error = undefined;
    });
    // update bed
    builder.addCase(updateBed.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(updateBed.rejected, (state, action) => {
      state.fetching = false;
      state.error = action.error.message;
    });
    builder.addCase(updateBed.fulfilled, (state, action) => {
      state.beds = state.beds?.map((bed) => (bed.id === action.payload.id ? action.payload : bed));
      state.fetching = false;
      state.error = undefined;
    });
  },
});

export const { clearRecentBed } = bedsSlice.actions;

export default bedsSlice.reducer;

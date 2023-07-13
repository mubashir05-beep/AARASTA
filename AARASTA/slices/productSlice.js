import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "@/lib/client";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const query = '*[_type=="product"]';
    const products = await client.fetch(query);
    return products;
  }
);
const productSlice = createSlice({
    name: "products",
    initialState: { data: [] },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
      });
    },
  });

export default productSlice.reducer;

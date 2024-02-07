import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    file: null,
    // isFetching: false,
    // error: false,
    upload: { loading: false, error: null },
  },
  reducers: {
    // UPLOAD IMAGE
    // uploadImageStart: (state, action) => {
    'image/upload/start': (state, action) => {
      state.file = action.payload;
      state.upload.loading = true;
    },
    // uploadImageSuccess: (state) => {
    'image/upload/success': (state, action) => {
      state.file = null;
      state.upload.loading = false;
    },
    // uploadImageFailure: (state, action) => {
    'image/upload/failure': (state, action) => {
      state.upload.loading = false;
      state.upload.error = action.payload;
    },
  },
});

export const {
  // uploadImageStart, uploadImageSuccess, uploadImageFailure
} = imageSlice.actions;
export default imageSlice.reducer;

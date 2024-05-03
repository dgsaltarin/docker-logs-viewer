import { configureStore } from "@reduxjs/toolkit";
import containerSlice from "./slices/containerSlice";

const store = configureStore({
  reducer: {
    container: containerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

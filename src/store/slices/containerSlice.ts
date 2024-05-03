import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContainers } from "../../api/index";
import { Container } from "../../models/models";
import ContainerSliceProps from "../../models/slices/containerSlice";

export const getContainersList = createAsyncThunk(
  "containers/getContainers",
  async () => {
    const containerList: Container[] = await getContainers();
    return containerList;
  },
);

const initialState = {
  containers: [],
  loading: false,
};

const containerSlice = createSlice({
  name: "containers",
  initialState,
  reducers: {
    setContainers: (
      state: ContainerSliceProps,
      action: { payload: Container[] },
    ) => {
      state.containers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContainersList.pending, (state: ContainerSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      getContainersList.fulfilled,
      (state: ContainerSliceProps, action: { payload: Container[] }) => {
        state.loading = false;
        state.containers = action.payload;
      },
    );
    builder.addCase(
      getContainersList.rejected,
      (state: ContainerSliceProps) => {
        state.loading = false;
      },
    );
  },
});

export const { setContainers } = containerSlice.actions;

export default containerSlice.reducer;

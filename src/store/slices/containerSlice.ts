import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContainers } from "../../api/index";
import { Container } from "../../models/models";
import ContainerSliceProps from "../../models/slices/containerSlice";

export const getContainerList = createAsyncThunk(
  "container/getContainerList",
  async () => {
    const containerList: Container[] = await getContainers();
    return containerList;
  },
);

const initialState: ContainerSliceProps = {
  containers: [] as Container[],
  loading: false,
};

const containerSlice = createSlice({
  name: "container",
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
    builder.addCase(getContainerList.pending, (state: ContainerSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      getContainerList.fulfilled,
      (state: ContainerSliceProps, action: { payload: Container[] }) => {
        state.loading = false;
        state.containers = action.payload;
      },
    );
    builder.addCase(getContainerList.rejected, (state: ContainerSliceProps) => {
      state.loading = false;
    });
  },
});

export const { setContainers } = containerSlice.actions;

export default containerSlice.reducer;

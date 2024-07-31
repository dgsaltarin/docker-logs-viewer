import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQAContainers } from "../../api/index";
import { Container } from "../../models/models";
import ContainerSliceProps from "../../models/slices/containerSlice";

export const getQaContainerList = createAsyncThunk(
  "container/getQaContainerList",
  async () => {
    const containerList: Container[] = await getQAContainers();
    return containerList;
  },
);

const initialState: ContainerSliceProps = {
  containers: [] as Container[],
  loading: false,
  currentEnvironment: "dev",
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
    setCurrentEnvironment: (
      state: ContainerSliceProps,
      action: { payload: string },
    ) => {
      state.currentEnvironment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getQaContainerList.pending,
      (state: ContainerSliceProps) => {
        state.loading = true;
      },
    );
    builder.addCase(
      getQaContainerList.fulfilled,
      (state: ContainerSliceProps, action: { payload: Container[] }) => {
        state.loading = false;
        state.containers = action.payload;
      },
    );
    builder.addCase(
      getQaContainerList.rejected,
      (state: ContainerSliceProps) => {
        state.loading = false;
      },
    );
  },
});

export const { setContainers, setCurrentEnvironment } = containerSlice.actions;

export default containerSlice.reducer;

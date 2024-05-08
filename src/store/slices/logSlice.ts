import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDevContainerLogs, getQAContainerLogs } from "../../api/index";
import { Log } from "../../models/models";
import { LogSliceProps } from "../../models/slices/logSliceProps";

export const getDevContainerLog = createAsyncThunk(
  "container/getDevContainerLogs",
  async (containerName: string) => {
    const response = await getDevContainerLogs(containerName);
    return response;
  },
);

export const getQaContainerLog = createAsyncThunk(
  "container/getQaContainerLogs",
  async (containerName: string) => {
    const response = await getQAContainerLogs(containerName);
    return response;
  },
);

const initialState: LogSliceProps = {
  logs: {
    logs: "",
  } as Log,
  loading: false,
};

const logSlice = createSlice({
  name: "log",
  initialState: initialState,
  reducers: {
    setLogs: (state: LogSliceProps, action: { payload: Log }) => {
      state.logs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDevContainerLog.pending, (state: LogSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      getDevContainerLog.fulfilled,
      (state: LogSliceProps, action: { payload: Log }) => {
        state.loading = false;
        state.logs = action.payload;
      },
    );
    builder.addCase(getDevContainerLog.rejected, (state: LogSliceProps) => {
      state.loading = false;
    });
    builder.addCase(getQaContainerLog.pending, (state: LogSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      getQaContainerLog.fulfilled,
      (state: LogSliceProps, action: { payload: Log }) => {
        state.loading = false;
        state.logs = action.payload;
      },
    );
  },
});

export const { setLogs } = logSlice.actions;

export default logSlice.reducer;

import { getServicesList, getClusterList } from "../../api";
import { Service } from "../../models/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { awsServiceSliceProps } from "@types/slices/awsServiceSliceProps";

export const getAwsServices = createAsyncThunk(
  "awsServices/getAwsServices",
  async (clusterName: string) => {
    const response = await getServicesList(clusterName);
    return response.json();
  },
);

export const getClusters = createAsyncThunk(
  "awsServices/getClusters",
  async () => {
    const response: string[] = await getClusterList();
    return response;
  },
);

const initialState: awsServiceSliceProps = {
  services: [],
  loading: false,
  clusters: [],
};

const awsServicesSlice = createSlice({
  name: "awsServices",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAwsServices.pending, (state: awsServiceSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      getAwsServices.fulfilled,
      (state: awsServiceSliceProps, action: { payload: Service[] }) => {
        state.loading = false;
        state.services = action.payload;
      },
    );
    builder.addCase(getAwsServices.rejected, (state: awsServiceSliceProps) => {
      state.loading = false;
    });
    builder.addCase(getClusters.pending, (state: awsServiceSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      getClusters.fulfilled,
      (state: awsServiceSliceProps, action: { payload: string[] }) => {
        state.loading = false;
        state.clusters = action.payload;
      },
    );
    builder.addCase(getClusters.rejected, (state: awsServiceSliceProps) => {
      state.loading = false;
    });
  },
});

export default awsServicesSlice.reducer;

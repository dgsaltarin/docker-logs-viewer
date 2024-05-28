import { getServicesList, getClusterList } from "../../api";
import { Service } from "../../models/models";
import { AwsServices } from "../../models/slices/awsServiceSliceProps";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

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
    const response = await getClusterList();
    return response.json();
  },
);

const initialState: AwsServices = {
  services: [],
  loading: false,
  clusters: [],
};

const awsServicesSlice = createSlice({
  name: "awsServices",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAwsServices.pending, (state: AwsServices) => {
      state.loading = true;
    });
    builder.addCase(
      getAwsServices.fulfilled,
      (state: AwsServices, action: { payload: Service[] }) => {
        state.loading = false;
        state.services = action.payload;
      },
    );
    builder.addCase(getAwsServices.rejected, (state: AwsServices) => {
      state.loading = false;
    });
    builder.addCase(getClusters.pending, (state: AwsServices) => {
      state.loading = true;
    });
    builder.addCase(
      getClusters.fulfilled,
      (state: AwsServices, action: { payload: string[] }) => {
        state.loading = false;
        state.clusters = action.payload;
      },
    );
    builder.addCase(getClusters.rejected, (state: AwsServices) => {
      state.loading = false;
    });
  },
});

export default awsServicesSlice.reducer;

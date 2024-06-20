import { getServicesList, getClusterList } from "../../api";
import { Service } from "../../models/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import AwsServices from "@models/slices/awsServiceSliceProps";

export const getAwsServices = createAsyncThunk(
  "awsServices/getAwsServices",
  async (clusterName: string) => {
    const response = await getServicesList(clusterName);
    console.log("response", response);
    return response;
  },
);

export const getClusters = createAsyncThunk(
  "awsServices/getClusters",
  async () => {
    const response: string[] = await getClusterList();
    return response;
  },
);

const initialState: AwsServices = {
  services: [],
  loadingServices: false,
  clusters: [],
};

const awsServicesSlice = createSlice({
  name: "awsServices",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAwsServices.pending, (state: AwsServices) => {
      state.loadingServices = true;
    });
    builder.addCase(
      getAwsServices.fulfilled,
      (state: AwsServices, action: { payload: Service[] }) => {
        state.loadingServices = false;
        state.services = action.payload;
      },
    );
    builder.addCase(getAwsServices.rejected, (state: AwsServices) => {
      state.loadingServices = false;
    });
    builder.addCase(getClusters.pending, (state: AwsServices) => {
      state.loadingServices = true;
    });
    builder.addCase(
      getClusters.fulfilled,
      (state: AwsServices, action: { payload: string[] }) => {
        state.loadingServices = false;
        state.clusters = action.payload;
      },
    );
    builder.addCase(getClusters.rejected, (state: AwsServices) => {
      state.loadingServices = false;
    });
  },
});

export default awsServicesSlice.reducer;

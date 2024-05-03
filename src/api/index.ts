import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://monitor.farmuhub.co";

export const getContainers = async () => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL}/ecs_app/list_containers/`,
  );
  return response.data;
};

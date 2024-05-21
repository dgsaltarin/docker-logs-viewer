import axios, { AxiosResponse } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const BASE_URL_DEV = "https://monitor.farmuhub.co";
const BASE_URL_QA = "https://qa.monitor.farmuhub.co";

export const getDevContainers = async () => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_DEV}/ecs_app/list_containers/`,
  );
  return response.data.containers;
};

export const getQAContainers = async () => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_QA}/ecs_app/list_containers/`,
  );
  return response.data.containers;
};

export const getDevContainerLogs = async (containerName: string) => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_DEV}/ecs_app/view_logs/${containerName}`,
  );
  return response.data.logs;
};

export const getQAContainerLogs = async (containerName: string) => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_QA}/ecs_app/view_logs/${containerName}`,
  );
  return response.data.logs;
};

export const loginFirebase = async (email: string, password: string) => {
  const auth = getAuth();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};

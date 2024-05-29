import axios, { AxiosResponse } from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const BASE_URL_DEV = import.meta.env.VITE_DEV_BASE_URL;
const BASE_URL_QA = import.meta.env.VITE_QA_BASE_URL;

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

export const getClusterList = async () => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_DEV}/ecs_app/list_clusters/`,
  );
  return response.data.clusters;
};

export const getServicesList = async (clusterName: string) => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_DEV}/ecs_app/list_services/${clusterName}`,
  );
  console.log(response.data);
  return response.data.services;
};

export const loginFirebase = async (email: string, password: string) => {
  const auth = getAuth();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};

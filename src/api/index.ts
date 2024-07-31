import axios, { AxiosResponse } from "axios";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const BASE_URL_QA = import.meta.env.VITE_QA_BASE_URL;

export const getQAContainers = async () => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_QA}/ecs_app/list_containers/`,
  );
  return response.data.containers;
};

export const getQAContainerLogs = async (containerName: string) => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_QA}/ecs_app/view_logs/${containerName}`,
  );
  return response.data.logs;
};

export const getClusterList = async () => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_QA}/ecs_app/list_clusters/`,
  );
  return response.data.clusters;
};

export const getServicesList = async (clusterName: string) => {
  const response: AxiosResponse = await axios.get(
    `${BASE_URL_QA}/ecs_app/list_services/${clusterName}`,
  );
  return response.data.services;
};

export const loginFirebase = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  const auth = getAuth();
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

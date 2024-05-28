import { Service } from "../models";

export interface AwsServices {
  services: Service[];
  loading: boolean;
  clusters: string[];
}

import { Service } from "@models/models";

export default interface AwsServices {
  services: Service[];
  loadingServices: boolean;
  clusters: string[];
}

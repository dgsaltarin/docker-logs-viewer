import { Service } from "@models/models";

export default interface AwsServices {
  services: Service[];
  loading: boolean;
  clusters: string[];
}

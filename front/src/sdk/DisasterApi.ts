import { type AxiosInstance } from "axios";
import type { Disaster, Optimization } from "../types/types";

export class DisasterApi {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getDisasters(): Promise<Disaster[]> {
    const response = await this.client.get<Disaster[]>("/disasters");
    return response.data;
  }

  async getResourceOptimization(): Promise<Optimization> {
    const response = await this.client.get<Optimization>("/resource-optimization");
    return response.data;
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.client.get<{ status: string; timestamp: string }>("/health");
    return response.data;
  }

  async crash(): Promise<void> {
    await this.client.get("/crash");
  }
}

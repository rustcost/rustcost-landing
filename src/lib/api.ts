import axios, { AxiosError, type AxiosInstance } from "axios";

export class ApiClientError extends Error {
  status?: number;
  details?: unknown;
  cause?: unknown;

  constructor(message: string, options: { status?: number; details?: unknown; cause?: unknown } = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.details = options.details;
    this.cause = options.cause;
  }
}

const API_TIMEOUT = 20000;
const DOCKER_HUB_BASE_URL = "/docker-hub/v2/";
const DOCKER_DASHBOARD_PATH = "repositories/kimc1992/rustcost-dashboard/tags";

const toApiClientError = (error: AxiosError) => {
  const status = error.response?.status;
  const details = error.response?.data ?? error.message;
  const maybeMessage =
    typeof error.response?.data === "object" && error.response?.data && "message" in (error.response.data as Record<string, unknown>)
      ? (error.response.data as { message?: unknown }).message
      : undefined;
  const message = (maybeMessage !== undefined ? String(maybeMessage) : undefined) ?? error.message ?? "Network request failed";

  return new ApiClientError(status ? `[${status}] ${message}` : message, {
    status,
    details,
    cause: error,
  });
};

const createClient = (config: Parameters<typeof axios.create>[0]): AxiosInstance => {
  const client = axios.create(config);
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(toApiClientError(error))
  );
  return client;
};

export const apiClient = createClient({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: API_TIMEOUT,
});

const dockerHubClient = createClient({
  baseURL: DOCKER_HUB_BASE_URL,
  timeout: API_TIMEOUT,
});

export interface DockerHubTag {
  name: string;
  last_updated: string;
  full_size: number;
  tag_status?: string;
  images?: Array<{ architecture?: string; digest?: string }>;
}

export interface DockerHubTagsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DockerHubTag[];
}

export const fetchDockerHubDashboardTags = async (pageSize = 100) => {
  const response = await dockerHubClient.get<DockerHubTagsResponse>(DOCKER_DASHBOARD_PATH, {
    params: { page_size: pageSize },
  });
  return response.data;
};

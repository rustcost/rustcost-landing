import axios, { AxiosError, type AxiosInstance } from "axios";
import {
  API_BASE_URL,
  API_TIMEOUT_MS,
  DEFAULT_DOCKER_TAG_PAGE_SIZE,
  DOCKER_DASHBOARD_PATH,
  DOCKER_HUB_BASE_URL,
} from "@/constants/api";
import type { DockerHubTagsResponse } from "@/types/api";

export class ApiClientError extends Error {
  status?: number;
  details?: unknown;
  cause?: unknown;

  constructor(
    message: string,
    options: { status?: number; details?: unknown; cause?: unknown } = {}
  ) {
    super(message);
    this.name = "ApiClientError";
    this.status = options.status;
    this.details = options.details;
    this.cause = options.cause;
  }
}

const toApiClientError = (error: AxiosError) => {
  const status = error.response?.status;
  const details = error.response?.data ?? error.message;
  const maybeMessage =
    typeof error.response?.data === "object" &&
    error.response?.data &&
    "message" in (error.response.data as Record<string, unknown>)
      ? (error.response.data as { message?: unknown }).message
      : undefined;
  const message =
    (maybeMessage !== undefined ? String(maybeMessage) : undefined) ??
    error.message ??
    "Network request failed";

  return new ApiClientError(status ? `[${status}] ${message}` : message, {
    status,
    details,
    cause: error,
  });
};

const createClient = (
  config: Parameters<typeof axios.create>[0]
): AxiosInstance => {
  const client = axios.create(config);
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(toApiClientError(error))
  );
  return client;
};

export const apiClient = createClient({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

const dockerHubClient = createClient({
  baseURL: DOCKER_HUB_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

export const fetchDockerHubDashboardTags = async (
  pageSize = DEFAULT_DOCKER_TAG_PAGE_SIZE
) => {
  const response = await dockerHubClient.get<DockerHubTagsResponse>(
    DOCKER_DASHBOARD_PATH,
    {
      params: { page_size: pageSize },
    }
  );
  return response.data;
};

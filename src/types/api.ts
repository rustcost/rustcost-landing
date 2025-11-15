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


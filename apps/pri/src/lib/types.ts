export type TemplateOption = {
  name: string;
  description: string;
};

export type SaveApiResponse = {
  success: boolean;
  id?: number;
  slug: string;
  name?: string;
  purpose?: string;
  template?: string;
  config?: Record<string, unknown>;
};

export type ExecutionResponse = {
  success: boolean;
  slug?: string;
  action?: string;
  purpose?: string;
  template?: string;
  input?: Record<string, unknown>;
  execution?: {
    status: string;
    summary: string;
    steps: Array<{
      step: string;
      result: Record<string, unknown>;
    }>;
  };
  robot?: Record<string, unknown>;
  world?: Record<string, unknown>;
  [key: string]: unknown;
};

export type GeneratedApiBundle = {
  success: boolean;
  mode?: string;
  endpoint?: string;
  files?: {
    route_file?: string;
    schema_file?: string;
  };
  spec?: {
    name?: string;
    purpose?: string;
    template?: string;
    config?: Record<string, unknown>;
    input?: Record<string, unknown>;
    slug?: string;
  };
  code?: {
    route_code?: string;
    schema_code?: string;
    curl_example?: string;
  };
  [key: string]: unknown;
};

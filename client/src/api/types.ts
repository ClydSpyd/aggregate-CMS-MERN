export interface ApiResponse<T = unknown> {
  status: number;
  data?: T;
  error?: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
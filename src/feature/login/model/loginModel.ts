
export interface LoginRequest {
  password: string;
  userId: string;
}

export interface LoginResponse {
  login: boolean;
}

export interface MeResponse {
  me: {
    id: string;
    name: string;
  };
}

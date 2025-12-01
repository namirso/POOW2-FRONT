export interface Usuario {
  id?: number;
  nome?: string;
  email?: string;
  role?: string;
}

export interface TokenResponse {
  token: string;
}

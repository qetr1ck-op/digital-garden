export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  email: string;
  sub: string;
}

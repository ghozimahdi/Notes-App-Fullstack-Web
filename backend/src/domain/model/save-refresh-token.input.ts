export interface SaveRefreshTokenInput {
  ip: string;
  userAgent: string;
  refreshToken: string;
  accessToken: string;
  userId: string;
  expiresIn: string;
}
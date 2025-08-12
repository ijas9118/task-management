export interface IAuthService {
  register(email: string, name: string, password: string): Promise<void>;
  verifyOtp(otp: string, registerId: string): Promise<boolean>;
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }>;
}

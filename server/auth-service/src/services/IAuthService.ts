export interface IAuthService {
  register(email: string, name: string, password: string): Promise<{ hashed: string; otp: number }>;
}

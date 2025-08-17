export class UserAlreadyExistsError extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} already exists`);
    this.name = "UserAlreadyExistsError";
  }
}

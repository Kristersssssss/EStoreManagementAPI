import { LoginCredentials, User } from "./types";

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  admin: { password: "admin123", user: { username: "admin", role: "admin" } },
  user: { password: "user123", user: { username: "user", role: "user" } },
};

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const entry = MOCK_USERS[credentials.username];
  if (!entry || entry.password !== credentials.password) {
    throw new Error("Invalid username or password");
  }

  return entry.user;
};

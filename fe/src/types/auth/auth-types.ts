

type LoginDto = {
  email: string | undefined;
  password: string | undefined;
}

type UserDto = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

type SignUpDto = {
  user: UserDto;
}

type AuthResponse = {
  token: string;
}

export type {UserDto, LoginDto, SignUpDto, AuthResponse};
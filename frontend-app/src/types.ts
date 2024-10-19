export interface RegisterCredentials {
  email: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface PhotoFields {
  user: string;
  title: string;
  image: string | null;
}

export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string | null;
}
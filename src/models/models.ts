export interface Container {
  id: number;
  name: string;
}

export interface Log {
  logs: string;
}

export interface User {
  email: string;
  password: string;
}

export interface Service {
  name: string;
  id: number;
}

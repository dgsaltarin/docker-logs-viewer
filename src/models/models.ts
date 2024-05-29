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
  service_name: string;
  service_arn: string;
  tasks: Task[];
}

export interface Task {
  task_id: number;
  last_status: string;
  started_at: string;
}

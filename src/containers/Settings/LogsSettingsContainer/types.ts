export interface ILog {
  _id: string;
  user?: string | null;
  method: string;
  url: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  type?: "pubapi" | "user";
  body?: Record<string, any>;
  query?: Record<string, any>;
}

export interface IMethod {
  name: string;
  description: string;
}

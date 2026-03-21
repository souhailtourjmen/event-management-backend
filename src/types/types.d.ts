export type TSignupForm = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type TSigninForm = {
  email: string;
  password: string;
};

export type TEvent = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  clients: TClient[];
};

export type TClient = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  events: TEvent[];
};

export type TApiResponse<T = any> = {
  success: boolean;
  message: string;
  data: T;
};

// Extend the Express Request type to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        fullName?: string;
        email?: string;
      };
    }
  }
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface MonthlyIncome {
  salary: number;
  additionalIncome: number;
  incomeSource: string;
  paymentDate: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar: string;
  preferences: {
    currency: string;
    theme: string;
    accentColor: string;
    language: string;
    dateFormat: string;
  };
  monthlyIncome: MonthlyIncome;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

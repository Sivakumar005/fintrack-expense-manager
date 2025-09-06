export const BASE_URL = "http://localhost:5000/";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/signup",
    GET_USER_INFO: "/api/auth/getuser",
  },

  DASHBOARD: {
    GET_DATA: "/api/dashboard",
  },

  INCOME: {
    ADD_INCOME: "/api/income/add",
    GET_ALL_INCOME: "/api/income/get",
    DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/income/downloadExcel",
  },

  EXPENSE: {
    ADD_EXPENSE: "/api/expense/add",
    GET_ALL_EXPENSE: "/api/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/expense/downloadExcel",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};

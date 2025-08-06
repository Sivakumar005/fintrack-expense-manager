export const BASE_URL="https://localhost:8000";

export const API_PATHS={
    AUTH:{
        LOGIN:"/api/auth/login",
        SIGNUP:"/api/auth/signup",
        GET_USER_DATA:"/api/auth/getuser",
    },
    INCOME:{
        
    },
    DASHBOARD:{
        GET_DATA:"/api/dashboard"
    },
    EXPENSE:{
        ADD_EXPENSE:"api/expense/add",
        DELETE_EXPENSE:"api/expense/:id",
        GET_EXPENSES:"/api/expense/get",
        
    }
}



// addIncome,
//     deleteIncome,
//     getAllIncome,
//     downloadIncomeExcel


// addExpense,
//     deleteExpense,
//     getAllExpenses,
//     downloadExpenseExcel
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import ExpenseHeader from "../../components/Expense/ExpenseHeader";
import ExpenseSummaryCard from "../../components/Expense/ExpenseSummaryCard";
import ExpenseList from "../../components/Expense/ExpenseList";
import ExpenseEmptyState from "../../components/Expense/ExpenseEmptyState";
import ExpenseModal from "../../components/Expense/ExpenseModal";

export const Expense = () => {
    useUserAuth();

    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalExpense, setTotalExpense] = useState(0);

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
            if (response.data) {
                setExpenses(response.data);
                const total = response.data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
                setTotalExpense(total);
            }
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (formData) => {
        try {
            const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, formData);
            if (response.data) {
                setExpenses([response.data, ...expenses]);
                setTotalExpense(totalExpense + parseFloat(formData.amount));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Failed to add expense. Please try again.");
        }
    };

    const handleDeleteExpense = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;

        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            const deletedExpense = expenses.find(expense => expense._id === id);
            setExpenses(expenses.filter(expense => expense._id !== id));
            setTotalExpense(totalExpense - parseFloat(deletedExpense.amount));
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert("Failed to delete expense. Please try again.");
        }
    };

    const handleDownloadExcel = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading Excel:", error);
            alert("Failed to download Excel file. Please try again.");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <DashboardLayout activeMenu="Expense">
            <div className="p-6">
                <ExpenseHeader
                    onAddClick={() => setIsModalOpen(true)}
                    onDownloadClick={handleDownloadExcel}
                    hasExpenses={expenses.length > 0}
                />

                <ExpenseSummaryCard
                    totalExpense={totalExpense}
                    expenseCount={expenses.length}
                />

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">Loading expenses...</div>
                    </div>
                ) : expenses.length > 0 ? (
                    <ExpenseList
                        expenses={expenses}
                        onDelete={handleDeleteExpense}
                    />
                ) : (
                    <ExpenseEmptyState onAddClick={() => setIsModalOpen(true)} />
                )}

                <ExpenseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddExpense}
                />
            </div>
        </DashboardLayout>
    );
};
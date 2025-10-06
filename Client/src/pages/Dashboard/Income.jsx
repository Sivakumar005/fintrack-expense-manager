import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import IncomeHeader from "../../components/income/IncomeHeader";
import IncomeSummaryCard from "../../components/income/IncomeSummaryCard";
import IncomeList from "../../components/income/IncomeList";
import IncomeEmptyState from "../../components/income/IncomeEmptyState";
import IncomeModal from "../../components/income/incomeModal";

export const Income = () => {
    useUserAuth();

    const navigate = useNavigate();
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalIncome, setTotalIncome] = useState(0);

    const fetchIncomes = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            if (response.data) {
                setIncomes(response.data);
                const total = response.data.reduce((sum, income) => sum + parseFloat(income.amount), 0);
                setTotalIncome(total);
            }
        } catch (error) {
            console.error("Error fetching incomes:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (formData) => {
        try {
            const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, formData);
            if (response.data) {
                setIncomes([response.data, ...incomes]);
                setTotalIncome(totalIncome + parseFloat(formData.amount));
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding income:", error);
            alert("Failed to add income. Please try again.");
        }
    };

    const handleDeleteIncome = async (id) => {
        if (!window.confirm("Are you sure you want to delete this income?")) return;

        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            const deletedIncome = incomes.find(income => income._id === id);
            setIncomes(incomes.filter(income => income._id !== id));
            setTotalIncome(totalIncome - parseFloat(deletedIncome.amount));
        } catch (error) {
            console.error("Error deleting income:", error);
            alert("Failed to delete income. Please try again.");
        }
    };

    const handleDownloadExcel = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'income_details.xlsx');
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
        fetchIncomes();
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="p-6">
                <IncomeHeader
                    onAddClick={() => setIsModalOpen(true)}
                    onDownloadClick={handleDownloadExcel}
                    hasIncomes={incomes.length > 0}
                />

                <IncomeSummaryCard
                    totalIncome={totalIncome}
                    incomeCount={incomes.length}
                />

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">Loading incomes...</div>
                    </div>
                ) : incomes.length > 0 ? (
                    <IncomeList
                        incomes={incomes}
                        onDelete={handleDeleteIncome}
                    />
                ) : (
                    <IncomeEmptyState onAddClick={() => setIsModalOpen(true)} />
                )}

                <IncomeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddIncome}
                />
            </div>
        </DashboardLayout>
    );
};
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipaths";
import InfoCard from "../../components/Cards/InfoCard";
import TransactionItem from "../../components/Cards/TransactionCard";


export const Home = () => {
    useUserAuth();

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="p-6">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">Loading...</div>
                    </div>
                ) : dashboardData ? (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                        
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InfoCard
                                title="Total Balance"
                                value={dashboardData.totalBalance}
                                colorClass="bg-blue-500"
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            />
                            <InfoCard
                                title="Total Income"
                                value={dashboardData.totalIncome}
                                subtitle={`Last 60 days: $${dashboardData.last60DaysIncome.total.toLocaleString()}`}
                                colorClass="bg-green-500"
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                }
                            />
                            <InfoCard
                                title="Total Expenses"
                                value={dashboardData.totalExpenses}
                                subtitle={`Last 30 days: $${dashboardData.last30DaysExpenses.total.toLocaleString()}`}
                                colorClass="bg-red-500"
                                icon={
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                    </svg>
                                }
                            />
                        </div>

                        {/* Recent Transactions */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
                            {dashboardData.recentTransactions && dashboardData.recentTransactions.length > 0 ? (
                                <div className="space-y-1">
                                    {dashboardData.recentTransactions.map((transaction, index) => (
                                        <TransactionItem key={index} transaction={transaction} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-8">No recent transactions</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">No data available</div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
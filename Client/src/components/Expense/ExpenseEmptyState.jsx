import React from "react";

const ExpenseEmptyState = ({ onAddClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Expense Records</h3>
            <p className="text-gray-500 mb-6">Start tracking your expenses to better manage your budget</p>
            <button
                onClick={onAddClick}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
                Add Your First Expense
            </button>
        </div>
    );
};

export default ExpenseEmptyState;
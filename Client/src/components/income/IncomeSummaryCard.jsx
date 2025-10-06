import React from "react";

const IncomeSummaryCard = ({ totalIncome, incomeCount }) => {
    return (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-green-100 text-sm font-medium mb-1">Total Income</p>
                    <h2 className="text-4xl font-bold">
                        ${totalIncome.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </h2>
                    <p className="text-green-100 text-sm mt-2">
                        {incomeCount} {incomeCount === 1 ? 'income source' : 'income sources'}
                    </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default IncomeSummaryCard;
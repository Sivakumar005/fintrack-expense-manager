import React from "react";

const TransactionItem = ({ transaction }) => {
    const isExpense = transaction.type === 'expense';
    
    // Get the appropriate label based on transaction type
    const getTransactionLabel = () => {
        if (isExpense) {
            return transaction.category || 'Expense';
        } else {
            return transaction.source || 'Income';
        }
    };

    // Get description or fallback to category/source
    const getDescription = () => {
        if (transaction.description) {
            return transaction.description;
        }
        return isExpense ? transaction.category : transaction.source;
    };

    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3 flex-1">
                {/* Icon */}
                <div className={`text-2xl ${isExpense ? 'bg-red-50' : 'bg-green-50'} p-2 rounded-lg`}>
                    {transaction.icon || (isExpense ? '🛒' : '💰')}
                </div>
                
                {/* Transaction Details */}
                <div>
                    <p className="font-medium text-gray-800">{getDescription()}</p>
                    <p className="text-sm text-gray-500">{getTransactionLabel()}</p>
                </div>
            </div>
            
            {/* Amount and Date */}
            <div className="text-right">
                <p className={`font-semibold ${isExpense ? 'text-red-600' : 'text-green-600'}`}>
                    {isExpense ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString('en-US', { 
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2 
                    })}
                </p>
                <p className="text-xs text-gray-400">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
    );
};

export default TransactionItem;
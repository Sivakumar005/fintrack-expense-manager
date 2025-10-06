import React from "react";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({ expenses, onDelete }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {expenses.map((expense) => (
                <ExpenseCard
                    key={expense._id}
                    expense={expense}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ExpenseList;
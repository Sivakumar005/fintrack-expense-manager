import React from "react";
import IncomeCard from "./IncomeCard";

const IncomeList = ({ incomes, onDelete }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {incomes.map((income) => (
                <IncomeCard
                    key={income._id}
                    income={income}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default IncomeList;
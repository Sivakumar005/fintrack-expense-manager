
const InfoCard = ({ title, value, subtitle, icon, colorClass = "bg-blue-500" }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-800">
                        ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                    {subtitle && (
                        <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
                    )}
                </div>
                {icon && (
                    <div className={`${colorClass} rounded-full p-3 text-white`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoCard;

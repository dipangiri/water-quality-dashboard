const getBorderColor = (title, value) => {
    value = parseFloat(value);

    switch (title) {
        case 'pH Level':
            if (value >= 6.5 && value <= 8.5) return 'border-green-500';
            if (value < 6 || value > 9) return 'border-red-500';
            return 'border-yellow-500';

        case 'Temperature':
            if (value >= 10 && value <= 30) return 'border-green-500';
            return 'border-yellow-500';

        case 'Turbidity':
            if (value <= 5) return 'border-green-500';
            if (value > 10) return 'border-red-500';
            return 'border-yellow-500';

        default:
            return 'border-sky-500';
    }
};

function MetricCard({ title, value, unit }) {
    const borderColor = getBorderColor(title, value);

    return (
        <div className={`bg-slate-800 p-6 rounded-lg shadow-md border-l-4 ${borderColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
            { }
            <h2 className="text-sm font-medium text-slate-400">{title}</h2>
            <div className="mt-2 flex items-baseline">
                <p className="text-3xl font-semibold text-white">{value}</p>
                <span className="ml-2 text-slate-300">{unit}</span>
            </div>
        </div>
    );
}

export default MetricCard;
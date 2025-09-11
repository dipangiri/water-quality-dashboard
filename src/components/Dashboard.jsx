import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';

const generateDataPoint = (prevData) => {
    const lastTemp = prevData ? prevData.temperature : 25;
    const lastPh = prevData ? prevData.ph : 7.0;

    return {
        name: new Date().toLocaleTimeString(),
        temperature: parseFloat((lastTemp + (Math.random() - 0.5)).toFixed(1)),
        ph: parseFloat((lastPh + (Math.random() - 0.5) * 0.1).toFixed(1)),
        turbidity: (4.5 + Math.random()).toFixed(1),
        conductivity: 1400 + Math.floor(Math.random() * 200),
        dissolvedOxygen: (6.0 + Math.random()).toFixed(1),
        orp: 230 + Math.floor(Math.random() * 40),
    };
};

function Dashboard() {
    const [dataHistory, setDataHistory] = useState(() => [generateDataPoint()]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDataHistory(prevHistory => {
                const newPoint = generateDataPoint(prevHistory[prevHistory.length - 1]);
                const updatedHistory = [...prevHistory, newPoint].slice(-15);
                return updatedHistory;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const latestData = dataHistory[dataHistory.length - 1];

    if (!latestData) {
        return <div className="p-6 text-center">Loading sensor data...</div>;
    }

    return (
        <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <MetricCard title="Temperature" value={latestData.temperature} unit="°C" />
                <MetricCard title="pH Level" value={latestData.ph} unit="" />
                <MetricCard title="Turbidity" value={latestData.turbidity} unit="NTU" />
                <MetricCard title="Conductivity" value={latestData.conductivity} unit="µS/cm" />

                <ChartCard
                    data={dataHistory}
                    title="Temperature History (°C)"
                    dataKey="temperature"
                    color="#fb923c" 
                />
                <ChartCard
                    data={dataHistory}
                    title="pH Level History"
                    dataKey="ph"
                    color="#38bdf8"
                />
            </div>
        </main>
    );
}

export default Dashboard;
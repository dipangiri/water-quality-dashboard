import { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';

function Dashboard() {
  const [apiData, setApiData] = useState({ latest: {}, history: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://mocki.io/v1/bd326a1f-6c40-4a7e-970c-9635bb22b69d';

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  
  if (isLoading) {
    return <div className="p-6 text-center text-lg">🛰️ Fetching live sensor data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-lg text-red-400">⚠️ Error: {error}</div>;
  }

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <MetricCard title="Temperature" value={apiData.latest.temperature} unit="°C" />
        <MetricCard title="pH Level" value={apiData.latest.ph} unit="" />
        <MetricCard title="Turbidity" value={apiData.latest.turbidity} unit="NTU" />
        <MetricCard title="Conductivity" value={apiData.latest.conductivity} unit="µS/cm" />
        
        <ChartCard
          data={apiData.history}
          title="Temperature History (°C)"
          dataKey="temperature"
          color="#fb923c"
        />
        <ChartCard
          data={apiData.history}
          title="pH Level History"
          dataKey="ph"
          color="#38bdf8"
        />
      </div>
    </main>
  );
}

export default Dashboard;
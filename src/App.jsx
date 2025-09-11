import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-center p-4 text-sky-400">
            💧 Real-time Water Quality
          </h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
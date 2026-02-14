import { useState } from 'react';
import Dashboard from './components/Dashboard'; 
import SmartHome from './components/SmartHome'; 

function App() {
  const [activeTab, setActiveTab] = useState('intruder');

  return (
    <div className="min-h-screen bg-[#0a0419] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0933] via-[#0a0419] to-[#000000] text-white font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        
        {/* LANDING PAGE HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-white/5 pb-8">
          
          {/* Brand / Title Section */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/20">
              ⚡
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                Iyah Chavez' IoT Projects
              </h1>
              <p className="text-sm md:text-base text-indigo-400 font-medium tracking-wide">
                with Arduino Uno R4 WiFi
              </p>
            </div>
          </div>

          {/* Glassmorphic Navigation Tabs */}
          <div className="flex gap-2 bg-white/5 p-1.5 rounded-xl backdrop-blur-md border border-white/10 shadow-2xl">
            <button 
              onClick={() => setActiveTab('intruder')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'intruder' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/40 ring-1 ring-white/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              🛡️ Security
            </button>
            <button 
              onClick={() => setActiveTab('smarthome')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'smarthome' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/40 ring-1 ring-white/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              🏡 Smart Home
            </button>
          </div>
        </header>

        {/* Dynamic Content with Key-based Animation */}
        {/* The 'key' prop forces React to re-trigger the animation when tab changes */}
        <div key={activeTab} className="animate-fadeIn">
          {activeTab === 'intruder' ? <Dashboard /> : <SmartHome />}
        </div>
        
      </div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
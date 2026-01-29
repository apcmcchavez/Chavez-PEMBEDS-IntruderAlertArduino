import { useState } from 'react';
import StatsCard from './StatsCard';
import EventLog from './EventLog';

const Dashboard = () => {
  // Mock data
  const [latestDistance, setLatestDistance] = useState(23);
  const [totalIncidents, setTotalIncidents] = useState(20);
  const [systemStatus, setSystemStatus] = useState('online');
  const [events, setEvents] = useState([
    { id: 200, sensorType: 'ultrasonic', distance: 23, timestamp: 'Jan 29, 2026 - 9:48:32 AM' },
    { id: 199, sensorType: 'ultrasonic', distance: 13, timestamp: 'Jan 29, 2026 - 9:48:29 AM' },
    { id: 198, sensorType: 'ultrasonic', distance: 13, timestamp: 'Jan 29, 2026 - 9:48:10 AM' },
    { id: 197, sensorType: 'ultrasonic', distance: 22, timestamp: 'Jan 29, 2026 - 9:03:56 AM' },
    { id: 196, sensorType: 'ultrasonic', distance: 28, timestamp: 'Jan 29, 2026 - 9:03:54 AM' },
    { id: 195, sensorType: 'ultrasonic', distance: 6, timestamp: 'Jan 29, 2026 - 9:03:48 AM' },
    { id: 194, sensorType: 'ultrasonic', distance: 5, timestamp: 'Jan 29, 2026 - 8:57:03 AM' },
  ]);

  // Determine alert level for the main card logic
  const isCritical = latestDistance <= 10;
  const isWarning = latestDistance > 10 && latestDistance <= 20;

  return (
    <div className="min-h-screen bg-[#11001C] font-sans text-gray-100">
      
      {/* Header */}
      <header className="bg-[#220135] shadow-lg border-b border-[#3A025B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-[#520380] rounded-lg p-2 shadow-[0_0_10px_rgba(82,3,128,0.5)]">
                <div className="bg-[#520380] rounded-lg p-2 shadow-[0_0_10px_rgba(82,3,128,0.5)]">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h1m5 0h1" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">Simple Intruder Alert - Movement Scanner</h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Chavez PEMBEDS Project</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-[#1A0129] px-3 py-1 rounded-full border border-[#3A025B]">
              <span className={`h-2 w-2 rounded-full ${systemStatus === 'online' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-red-500'} animate-pulse`}></span>
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                {systemStatus === 'online' ? 'System Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* LATEST DETECTION - LEANING BLUE */}
          <StatsCard 
            title="Latest Detection" 
            value={latestDistance} 
            unit="cm away"
            iconType={isCritical ? 'danger' : isWarning ? 'warning' : 'safe'}
            bgColor={isCritical ? "bg-[#2e0a0a]" : "bg-[#1e1b4b]"} 
            borderColor={isCritical ? "border-red-500 animate-pulse" : isWarning ? "border-yellow-400" : "border-indigo-500"}
            textColor={isCritical ? "text-red-400" : isWarning ? "text-yellow-400" : "text-indigo-300"}
          />
      
          {/* TOTAL INCIDENTS - LEANING RED */}
          <StatsCard 
            title="Total Incidents" 
            value={totalIncidents} 
            unit="logged (Recent)"
            iconType="info"
            bgColor="bg-[#2e0219]" 
            borderColor="border-pink-900"
            textColor="text-pink-300"
          />
        </div>

        {/* Event Log */}
        <EventLog events={events} />
      </main>
    </div>
  );
};

export default Dashboard;
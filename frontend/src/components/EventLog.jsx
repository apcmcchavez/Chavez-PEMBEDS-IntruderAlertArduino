const EventLog = ({ events }) => {
  
  // Helper to choose color and icon based on distance
  const getStatusConfig = (distance) => {
    if (distance <= 10) return { 
      color: "text-red-400 bg-red-400/10 border-red-400/20", 
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ) // Exclamation Triangle
    };
    if (distance <= 20) return { 
      color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", 
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) // Question Mark
    };
    return { 
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", 
      icon: (
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) // Check Circle
    };
  };

  return (
    <div className="bg-[#1A0129] rounded-xl shadow-lg border border-[#E0B6E4] overflow-hidden">
      {/* Component Header (Title) */}
      <div className="px-6 py-4 border-b border-[#3A025B] flex justify-between items-center bg-[#E0B6E4]">
        <h2 className="text-lg font-bold text-[#1A0129] tracking-wide">Event Log</h2>
        <span className="text-xs text-[#d8b4fe] bg-[#3A025B] px-2 py-1 rounded">Updates every motion detected</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#3A025B]">
          <thead className="bg-[#3A025B]">
            <tr>
              {['Log ID', 'Sensor Type', 'Distance', 'Time Detected'].map((head) => (
                <th key={head} className="px-6 py-3 text-left text-xs font-bold text-gray-200 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#E0B6E4]">
            {events.map((event) => {
              const status = getStatusConfig(event.distance);
              return (
                <tr key={event.id} className="hover:bg-[#220135] transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                    #{event.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {event.sensorType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full border ${status.color}`}>
                      {status.icon}
                      {event.distance} cm
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                    {event.timestamp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventLog;
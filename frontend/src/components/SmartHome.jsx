import { useState, useEffect } from 'react';

// ⚠️ UPDATE THIS IP TO MATCH TODAY'S DJANGO SERVER IP
const API_URL = 'http://192.168.4.25:8000/api/controls/';

function SmartHome() {
  const [devices, setDevices] = useState([]);
  const [isDragging, setIsDragging] = useState(false); // New flag to pause updates

  const fetchDevices = async () => {
    // 🛑 If user is dragging, DON'T overwrite their screen with old server data!
    if (isDragging) return; 

    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDevices(data.sort((a, b) => a.id - b.id)); 
    } catch (err) {
      console.error("Error fetching controls:", err);
    }
  };

  // 1. Update only the SCREEN (Instant)
  const handleLocalUpdate = (id, newVal) => {
    setDevices(prev => prev.map(d => {
        if (d.id === id) {
            return { ...d, value: newVal, is_active: newVal > 0 };
        }
        return d;
    }));
  };

  // 2. Send to SERVER (Only when done dragging)
  const sendUpdate = async (id, value, is_active) => {
    try {
      await fetch(`${API_URL}${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, is_active })
      });
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 1000);
    return () => clearInterval(interval);
  }, [isDragging]); // Re-run effect if dragging state changes

  const activeCount = devices.filter(d => d.is_active).length;
  const totalPower = devices.length > 0
    ? Math.round((devices.reduce((sum, d) => sum + (d.is_active ? d.value : 0), 0) / (devices.length * 255)) * 100)
    : 0;

  const getRoom = (name) => {
    if(name.includes('1')) return 'Living Room';
    if(name.includes('2')) return 'Bedroom';
    if(name.includes('3')) return 'Kitchen';
    if(name.includes('4')) return 'Bathroom';
    if(name.includes('5')) return 'Office';
    return 'Ceiling Fan';
  };

  const colors = {
    darkPurple: '#11001C',
    russianViolet1: '#1A0129',
    russianViolet2: '#220135',
    russianViolet3: '#3A025B',
    indigo: '#520380',
  };

  return (
    <div className="min-h-screen text-white rounded-2xl p-8" style={{ background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.russianViolet1} 100%)` }}>

      {/* Header */}
      <div className="flex justify-between items-center mb-10 p-6 rounded-2xl border border-[#3A025B]/30" style={{ backgroundColor: colors.russianViolet2 }}>
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏡</div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Smart Home Control Panel</h1>
            <p className="text-white/60">Manage your lights, fans, and appliances</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#3A025B]/50 text-pink-200 px-4 py-2 rounded-full border border-[#520380]/50 font-semibold text-sm">
          <div className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse"></div>
          ALL SYSTEMS ONLINE
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="flex items-center gap-4 p-5 rounded-2xl border border-[#3A025B]/30" style={{ background: `linear-gradient(135deg, ${colors.russianViolet3}50 0%, ${colors.indigo}20 100%)` }}>
          <div className="w-12 h-12 rounded-xl bg-[#1A0129]/50 flex items-center justify-center text-2xl">💡</div>
          <div>
            <h3 className="text-2xl font-bold">{activeCount}</h3>
            <p className="text-xs text-white/60">Devices Active</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-5 rounded-2xl border border-[#3A025B]/30" style={{ background: `linear-gradient(135deg, ${colors.russianViolet3}50 0%, ${colors.indigo}20 100%)` }}>
          <div className="w-12 h-12 rounded-xl bg-[#1A0129]/50 flex items-center justify-center text-2xl">⚡</div>
          <div>
            <h3 className="text-2xl font-bold">{totalPower}%</h3>
            <p className="text-xs text-white/60">Total Power Usage</p>
          </div>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => {
          const isMotor = device.name.toLowerCase().includes('motor');
          const isOn = device.is_active;

          return (
            <div
              key={device.id}
              className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(236,72,153,0.15)] ${
                isOn
                  ? `border-[#ec4899]/40 bg-gradient-to-br from-[#3A025B] to-[#520380]`
                  : `border-[#3A025B]/30 bg-gradient-to-br from-[#1A0129] to-[#220135]`
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                    isOn
                      ? isMotor 
                        ? 'bg-teal-500/20 text-teal-300 shadow-lg shadow-teal-500/20' 
                        : 'bg-yellow-500/20 text-yellow-300 shadow-lg shadow-yellow-500/20'
                      : 'bg-[#11001C]/50 text-white/20'
                  }`}>
                    {isMotor ? '⚙️' : '💡'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{device.name}</h3>
                    <p className="text-xs text-white/50">{getRoom(device.name)}</p>
                  </div>
                </div>

                {/* Hot Pink Toggle Switch */}
                <button
                  onClick={() => {
                    const willBeActive = !device.is_active;
                    const newVal = willBeActive ? (device.value === 0 ? 255 : device.value) : 0;
                    
                    // 1. Update Screen
                    handleLocalUpdate(device.id, newVal);
                    // 2. Send to Server Immediately (Toggles don't need dragging logic)
                    sendUpdate(device.id, newVal, willBeActive);
                  }}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner ${
                    isOn 
                      ? `bg-[#ec4899] shadow-[0_0_15px_rgba(236,72,153,0.6)]` 
                      : 'bg-[#11001C]/80'
                  }`}
                >
                  <div className={`absolute top-[3px] w-6 h-6 rounded-full transition-all duration-300 shadow-md ${
                    isOn ? 'left-[29px] bg-white' : 'left-[3px] bg-white/30'
                  }`}></div>
                </button>
              </div>

              {/* Slider Controls */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-3 text-xs font-semibold text-white/60 uppercase tracking-wider">
                  <span>{isMotor ? 'Speed' : 'Brightness'}</span>
                  <span className="text-white text-lg">{isOn ? device.value : 0} <span className="text-sm text-white/50 font-normal">/ 255</span></span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="255"
                  value={isOn ? device.value : 0}
                  
                  // 1. When dragging starts: Pause background updates
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}

                  // 2. While dragging: Only update the screen (fast!)
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    handleLocalUpdate(device.id, val);
                  }}

                  // 3. When letting go: Resume updates AND send data to server
                  onMouseUp={(e) => {
                    setIsDragging(false);
                    const val = parseInt(e.target.value);
                    sendUpdate(device.id, val, val > 0);
                  }}
                  onTouchEnd={(e) => {
                    setIsDragging(false);
                    // Mobile touch events are tricky, usually state is already updated by onChange
                    sendUpdate(device.id, device.value, device.value > 0);
                  }}

                  className={`w-full h-2 rounded-full appearance-none outline-none transition-all 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                    ${
                    isOn
                      ? isMotor
                        ? `bg-gradient-to-r from-teal-900 to-teal-400 [&::-webkit-slider-thumb]:bg-teal-100 hover:[&::-webkit-slider-thumb]:scale-110`
                        : `bg-gradient-to-r from-yellow-900 to-yellow-400 [&::-webkit-slider-thumb]:bg-yellow-100 hover:[&::-webkit-slider-thumb]:scale-110`
                      : 'bg-[#11001C]/50 [&::-webkit-slider-thumb]:bg-white/10'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SmartHome;
const StatsCard = ({ title, value, unit, bgColor, textColor, borderColor }) => {
  return (
    <div className={`${bgColor} ${borderColor} border-l-4 rounded-xl p-6 shadow-lg`}>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className={`text-5xl font-extrabold ${textColor} drop-shadow-sm`}>{value}</p>
        {unit && <span className="ml-3 text-sm font-medium text-gray-500 uppercase tracking-wider">{unit}</span>}
      </div>
    </div>
  );
};

export default StatsCard;
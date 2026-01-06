import React from 'react';
import { Activity, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const QueueDashboard = ({ queue }) => {
  return (
    <div className="mcm-card p-6 relative overflow-hidden">
      {/* Decorative kidney shape */}
      <div className="absolute -top-8 -left-8 w-24 h-12 bg-[#2A7B7B] rounded-[50px_50px_50px_10px] opacity-15 transform -rotate-20 pointer-events-none" />

      <div className="section-header relative z-10">
        <div className="icon-wrap">
          <Activity size={18} className="text-[#FFFEF9]" />
        </div>
        <h2>Live Queue</h2>
        <span className="ml-auto text-[#D4A72C] text-lg">✦</span>
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[#5D4E37]/30 rounded-[20px_8px_20px_8px] relative z-10">
          <div className="text-[#D4A72C] text-3xl mb-3">✺</div>
          <p className="text-[#5D4E37]/60 text-sm font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            No active generations
          </p>
        </div>
      ) : (
        <div className="space-y-3 relative z-10">
          {queue.map((item) => (
            <div
              key={item.requestId}
              className="bg-[#FFFEF9] border-2 border-[#5D4E37]/30 rounded-[14px_5px_14px_5px] p-4 flex items-center justify-between group hover:border-[#5D4E37] hover:shadow-[2px_2px_0_#5D4E37] transition-all"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-xs font-bold text-[#3D3D3D] truncate mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                  {item.prompt}
                </div>
                <div className="text-[10px] text-[#5D4E37]/50 font-mono uppercase tracking-tight">
                  ID: {item.requestId.split('-')[0]}...
                </div>
              </div>
              <div className="flex items-center">
                {item.status === 'PENDING' && (
                  <div className="status-pending flex items-center gap-1.5">
                    <Clock size={12} />
                    Pending
                  </div>
                )}
                {item.status === 'PROCESSING' && (
                  <div className="status-processing flex items-center gap-1.5">
                    <Loader2 size={12} className="animate-spin" />
                    Processing
                  </div>
                )}
                {item.status === 'COMPLETED' && (
                  <div className="status-completed flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    Ready
                  </div>
                )}
                {item.status === 'FAILED' && (
                  <div className="status-error flex items-center gap-1.5">
                    <AlertCircle size={12} />
                    Error
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Decorative element */}
      <div className="absolute bottom-3 right-3 text-[#6B7B4C] opacity-30 text-xl pointer-events-none">✺</div>
    </div>
  );
};

export default QueueDashboard;

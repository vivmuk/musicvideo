import React from 'react';
import { Activity, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const QueueDashboard = ({ queue }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-violet-500/10 p-2 rounded-lg">
          <Activity size={18} className="text-violet-400" />
        </div>
        <h2 className="text-lg font-semibold text-white tracking-tight">
          Live Queue
        </h2>
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
          <p className="text-zinc-600 text-sm font-medium">No active generations</p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.requestId}
              className="bg-black/20 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-white/10 transition-colors"
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="text-xs font-semibold text-zinc-300 truncate mb-1">
                  {item.prompt}
                </div>
                <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
                  ID: {item.requestId.split('-')[0]}...
                </div>
              </div>
              <div className="flex items-center">
                {item.status === 'PENDING' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500/80 bg-amber-500/5 px-2.5 py-1 rounded-full border border-amber-500/10">
                    <Clock size={12} />
                    Pending
                  </div>
                )}
                {item.status === 'PROCESSING' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/5 px-2.5 py-1 rounded-full border border-blue-400/10">
                    <Loader2 size={12} className="animate-spin" />
                    Processing
                  </div>
                )}
                {item.status === 'COMPLETED' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/5 px-2.5 py-1 rounded-full border border-emerald-400/10">
                    <CheckCircle2 size={12} />
                    Ready
                  </div>
                )}
                {item.status === 'FAILED' && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-400/5 px-2.5 py-1 rounded-full border border-red-400/10">
                    <AlertCircle size={12} />
                    Error
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueDashboard;

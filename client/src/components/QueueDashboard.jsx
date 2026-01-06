import React from 'react';
import { LayoutDashboard, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const QueueDashboard = ({ queue }) => {
  if (queue.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-400">
          <LayoutDashboard size={20} />
          Live Queue
        </h2>
        <div className="text-center py-8 text-slate-500 italic">
          No active generations in queue.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-400">
        <LayoutDashboard size={20} />
        Live Queue
      </h2>
      <div className="space-y-3">
        {queue.map((item) => (
          <div
            key={item.requestId}
            className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-1 min-w-0 mr-4">
              <div className="text-sm font-medium text-slate-200 truncate">
                {item.prompt}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                ID: {item.requestId}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.status === 'PENDING' && (
                <span className="flex items-center gap-1 text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
                  <Clock size={14} />
                  Pending
                </span>
              )}
              {item.status === 'PROCESSING' && (
                <span className="flex items-center gap-1 text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                  <Loader2 size={14} className="animate-spin" />
                  Processing
                </span>
              )}
              {item.status === 'COMPLETED' && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} />
                  Completed
                </span>
              )}
              {item.status === 'FAILED' && (
                <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
                  <AlertCircle size={14} />
                  Failed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueDashboard;

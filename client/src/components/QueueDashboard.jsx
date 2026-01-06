import React from 'react';
import { Activity, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const QueueDashboard = ({ queue }) => {
  return (
    <div className="mcm-card p-6">
      <div className="section-header">
        <div className="icon-wrap">
          <Activity size={18} className="text-[#FFFEF9]" />
        </div>
        <h2>Live Queue</h2>
      </div>

      {queue.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Activity size={24} className="text-[#3D3D3D]" />
          </div>
          <p>No active generations</p>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((item) => (
            <div key={item.requestId} className="queue-item">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#3D3D3D] truncate">
                  {item.prompt}
                </div>
                <div className="text-xs text-[#7A6B54] mt-1 font-mono">
                  ID: {item.requestId.split('-')[0]}...
                </div>
              </div>
              <div className="flex-shrink-0">
                {item.status === 'PENDING' && (
                  <div className="status-badge status-pending">
                    <Clock size={12} />
                    <span>Pending</span>
                  </div>
                )}
                {item.status === 'PROCESSING' && (
                  <div className="status-badge status-processing">
                    <Loader2 size={12} className="animate-spin" />
                    <span>Processing</span>
                  </div>
                )}
                {item.status === 'COMPLETED' && (
                  <div className="status-badge status-completed">
                    <CheckCircle2 size={12} />
                    <span>Ready</span>
                  </div>
                )}
                {item.status === 'FAILED' && (
                  <div className="status-badge status-error">
                    <AlertCircle size={12} />
                    <span>Error</span>
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

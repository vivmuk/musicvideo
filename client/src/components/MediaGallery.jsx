import React from 'react';
import { Film, Download, ExternalLink, Play } from 'lucide-react';

const MediaGallery = ({ videos }) => {
  return (
    <div className="mcm-card p-6 sm:p-8">
      <div className="section-header">
        <div className="icon-wrap">
          <Film size={20} className="text-[#FFFEF9]" />
        </div>
        <h2>Production Gallery</h2>
      </div>

      {videos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Play size={28} className="text-[#3D3D3D] ml-1" />
          </div>
          <p>Your cinematic creations will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="video-card">
              <div className="video-wrapper">
                <video
                  src={video.url}
                  controls
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                />
              </div>
              <div className="video-info">
                <p className="text-sm text-[#3D3D3D] line-clamp-2 mb-4 font-medium leading-relaxed">
                  {video.prompt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t-2 border-[#F0EBE3]">
                  <span className="text-xs font-bold text-[#7A6B54] uppercase tracking-wider">
                    {new Date(video.timestamp).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={video.url}
                      download
                      className="btn-icon teal"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-icon mustard"
                      title="Open in new tab"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;

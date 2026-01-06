import React from 'react';
import { Film, Download, ExternalLink, Play } from 'lucide-react';

const MediaGallery = ({ videos }) => {
  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-violet-500/10 p-2 rounded-lg">
          <Film size={20} className="text-violet-400" />
        </div>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Production Gallery
        </h2>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-white/5 rounded-3xl">
          <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play size={24} className="text-zinc-700" />
          </div>
          <p className="text-zinc-500 font-medium">Your cinematic creations will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="group relative bg-black/40 rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all duration-300">
              <div className="aspect-video bg-black relative overflow-hidden">
                <video
                  src={video.url}
                  controls
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  poster={video.thumbnail}
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-zinc-400 line-clamp-2 mb-6 font-medium leading-relaxed">
                  {video.prompt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    {new Date(video.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={video.url}
                      download
                      className="p-2.5 bg-white/5 hover:bg-violet-500/20 text-zinc-400 hover:text-violet-400 rounded-xl transition-all border border-white/5 hover:border-violet-500/20"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/5 hover:bg-violet-500/20 text-zinc-400 hover:text-violet-400 rounded-xl transition-all border border-white/5 hover:border-violet-500/20"
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

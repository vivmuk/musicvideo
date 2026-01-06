import React from 'react';
import { Film, Download, ExternalLink, Play } from 'lucide-react';

const MediaGallery = ({ videos }) => {
  return (
    <div className="mcm-card p-8 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -right-10 w-32 h-16 bg-[#6B7B4C] rounded-[70px_70px_70px_20px] opacity-15 transform rotate-20 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-[#D4A72C] rounded-full opacity-10 pointer-events-none" />

      <div className="section-header relative z-10">
        <div className="icon-wrap">
          <Film size={20} className="text-[#FFFEF9]" />
        </div>
        <h2>Production Gallery</h2>
        <span className="ml-auto text-[#2A7B7B] text-xl">✺</span>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-[#5D4E37]/30 rounded-[24px_8px_24px_8px] relative z-10">
          <div className="bg-gradient-to-br from-[#D4A72C]/20 to-[#D4A72C]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-[#5D4E37]/30">
            <Play size={28} className="text-[#5D4E37]/50 ml-1" />
          </div>
          <p className="text-[#5D4E37]/60 font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            Your cinematic creations will appear here
          </p>
          <div className="flex justify-center gap-2 mt-4 text-[#D4A72C]/50">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative bg-[#FFFEF9] rounded-[20px_8px_20px_8px] overflow-hidden border-2 border-[#5D4E37] shadow-[4px_4px_0_#5D4E37] hover:shadow-[6px_6px_0_#5D4E37] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
            >
              {/* Video container with retro TV frame effect */}
              <div className="aspect-video bg-[#3D3D3D] relative overflow-hidden border-b-2 border-[#5D4E37]">
                <video
                  src={video.url}
                  controls
                  className="w-full h-full object-cover"
                  poster={video.thumbnail}
                />
                {/* Retro screen overlay effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
              </div>

              <div className="p-5">
                <p className="text-sm text-[#3D3D3D] line-clamp-2 mb-4 font-medium leading-relaxed">
                  {video.prompt}
                </p>

                {/* Atomic divider */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#5D4E37]/30 to-transparent" />
                  <div className="w-2 h-2 bg-[#D4A72C] rounded-full border border-[#5D4E37]" />
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#5D4E37]/30 to-transparent" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D4E37]/60" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                    {new Date(video.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={video.url}
                      download
                      className="p-2.5 bg-gradient-to-b from-[#2A7B7B] to-[#2A7B7B]/90 text-[#FFFEF9] rounded-full border-2 border-[#5D4E37] shadow-[2px_2px_0_#5D4E37] hover:shadow-[3px_3px_0_#5D4E37] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                      title="Download"
                    >
                      <Download size={14} />
                    </a>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gradient-to-b from-[#D4A72C] to-[#B8922A] text-[#3D3D3D] rounded-full border-2 border-[#5D4E37] shadow-[2px_2px_0_#5D4E37] hover:shadow-[3px_3px_0_#5D4E37] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                      title="Open in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative corner starburst */}
              <div className="absolute top-2 right-2 text-[#D4A72C] text-sm opacity-60">✦</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;

import React from 'react';
import { Film, Download, ExternalLink } from 'lucide-react';

const MediaGallery = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-pink-400">
          <Film size={20} />
          Media Gallery
        </h2>
        <div className="text-center py-12 text-slate-500 italic">
          Your generated videos will appear here.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg mt-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-pink-400">
        <Film size={20} />
        Media Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 group">
            <div className="aspect-video bg-black relative">
              <video
                src={video.url}
                controls
                className="w-full h-full object-contain"
                poster={video.thumbnail}
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-300 line-clamp-2 mb-3 italic">
                "{video.prompt}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {new Date(video.timestamp).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <a
                    href={video.url}
                    download
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </a>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
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
    </div>
  );
};

export default MediaGallery;

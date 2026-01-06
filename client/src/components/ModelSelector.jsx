import React from 'react';
import { Cpu } from 'lucide-react';

const MODELS = [
  { id: 'veo3-fast-text-to-video', name: 'Veo3 Fast', description: 'Fast, up to 1080p, 4-8s, Audio' },
  { id: 'veo3-full-text-to-video', name: 'Veo3 Full', description: 'Full quality, up to 1080p, 4-8s, Audio' },
  { id: 'veo3.1-fast-text-to-video', name: 'Veo3.1 Fast', description: 'Fast, up to 1080p, 4-8s, Audio' },
  { id: 'veo3.1-full-text-to-video', name: 'Veo3.1 Full', description: 'Full quality, up to 1080p, 4-8s, Audio' },
  { id: 'sora-2-text-to-video', name: 'Sora 2', description: '720p, 4-12s, Audio' },
  { id: 'sora-2-pro-text-to-video', name: 'Sora 2 Pro', description: '1080p, 4-12s, Audio' },
  { id: 'wan-2.5-preview-text-to-video', name: 'Wan 2.5 Preview', description: 'up to 480p, 5-10s, Audio' },
  { id: 'wan-2.2-a14b-text-to-video', name: 'Wan 2.2 A14B', description: 'up to 480p, 5s' },
  { id: 'kling-2.6-pro-text-to-video', name: 'Kling 2.6 Pro', description: '5-10s, Audio' },
  { id: 'kling-2.5-turbo-pro-text-to-video', name: 'Kling 2.5 Turbo Pro', description: '5-10s' },
  { id: 'ltx-2-fast-text-to-video', name: 'LTX-2 Fast', description: 'up to 2160p, 6-20s, Audio' },
  { id: 'ltx-2-full-text-to-video', name: 'LTX-2 Full', description: 'up to 2160p, 6-10s, Audio' },
  { id: 'longcat-distilled-text-to-video', name: 'Longcat Distilled', description: 'up to 720p, 5-30s' },
  { id: 'longcat-text-to-video', name: 'Longcat', description: 'up to 720p, 5-30s' }
];

const ModelSelector = ({ selectedModel, onModelChange }) => {
  return (
    <div className="mcm-card p-6 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#6B7B4C] rounded-full opacity-15 pointer-events-none" />

      <div className="section-header relative z-10">
        <div className="icon-wrap">
          <Cpu size={18} className="text-[#FFFEF9]" />
        </div>
        <h2>Neural Engine</h2>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 relative z-10">
        {MODELS.map((model) => (
          <label
            key={model.id}
            className={`group flex items-center justify-between p-4 rounded-[16px_6px_16px_6px] border-2 transition-all duration-200 cursor-pointer ${
              selectedModel === model.id
                ? 'bg-gradient-to-r from-[#2A7B7B]/20 to-[#3A9B9B]/10 border-[#2A7B7B] shadow-[3px_3px_0_#5D4E37]'
                : 'bg-[#FFFEF9] border-[#5D4E37]/30 hover:border-[#5D4E37] hover:shadow-[2px_2px_0_#5D4E37]'
            }`}
          >
            <div className="flex-1">
              <div className={`text-sm font-bold transition-colors ${
                selectedModel === model.id ? 'text-[#2A7B7B]' : 'text-[#3D3D3D] group-hover:text-[#2A7B7B]'
              }`} style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                {model.name}
              </div>
              <div className="text-[11px] text-[#5D4E37]/70 mt-0.5 font-medium">
                {model.description}
              </div>
            </div>
            <input
              type="radio"
              name="model"
              value={model.id}
              checked={selectedModel === model.id}
              onChange={(e) => onModelChange(e.target.value)}
              className="mcm-radio"
            />
          </label>
        ))}
      </div>

      {/* Decorative starburst */}
      <div className="absolute bottom-3 left-3 text-[#D4A72C] opacity-40 text-xl pointer-events-none">✦</div>
    </div>
  );
};

export default ModelSelector;

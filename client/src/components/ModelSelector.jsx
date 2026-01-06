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
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-violet-500/10 p-2 rounded-lg">
          <Cpu size={18} className="text-violet-400" />
        </div>
        <h2 className="text-lg font-semibold text-white tracking-tight">
          Neural Engine
        </h2>
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {MODELS.map((model) => (
          <label
            key={model.id}
            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
              selectedModel === model.id
                ? 'bg-violet-500/10 border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.1)]'
                : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5'
            }`}
          >
            <div className="flex-1">
              <div className={`text-sm font-semibold transition-colors ${
                selectedModel === model.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'
              }`}>
                {model.name}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                {model.description}
              </div>
            </div>
            <input
              type="radio"
              name="model"
              value={model.id}
              checked={selectedModel === model.id}
              onChange={(e) => onModelChange(e.target.value)}
              className="w-4 h-4 border-2 border-zinc-700 rounded-full appearance-none checked:bg-violet-500 checked:border-violet-500 transition-all cursor-pointer"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;

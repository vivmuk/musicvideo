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
    <div className="mcm-card p-6">
      <div className="section-header">
        <div className="icon-wrap">
          <Cpu size={18} className="text-[#FFFEF9]" />
        </div>
        <h2>Neural Engine</h2>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {MODELS.map((model) => (
          <label
            key={model.id}
            className={`model-option ${selectedModel === model.id ? 'selected' : ''}`}
          >
            <div className="flex-1 min-w-0 mr-4">
              <div className={`text-sm font-bold ${selectedModel === model.id ? 'text-[#2A7B7B]' : 'text-[#3D3D3D]'}`}>
                {model.name}
              </div>
              <div className="text-xs text-[#7A6B54] mt-1">
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
    </div>
  );
};

export default ModelSelector;

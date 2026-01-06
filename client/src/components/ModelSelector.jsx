import React from 'react';
import { Video } from 'lucide-react';

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
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
        <Video size={20} />
        Video Model
      </h2>
      <div className="space-y-3">
        {MODELS.map((model) => (
          <label
            key={model.id}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              selectedModel === model.id
                ? 'bg-purple-900/20 border-purple-500'
                : 'bg-slate-900 border-slate-700 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="model"
              value={model.id}
              checked={selectedModel === model.id}
              onChange={(e) => onModelChange(e.target.value)}
              className="mt-1 text-purple-500 focus:ring-purple-500"
            />
            <div>
              <div className="font-medium text-slate-200">{model.name}</div>
              <div className="text-xs text-slate-400">{model.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;

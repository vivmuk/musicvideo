import React from 'react';
import { Settings2 } from 'lucide-react';

const ParameterConfig = ({ config, onConfigChange, selectedModel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onConfigChange({ ...config, [name]: value });
  };

  // Model-specific constraints based on Video Models.md
  const getDurationOptions = () => {
    if (selectedModel.includes('sora')) return [4, 6, 8, 10, 12];
    if (selectedModel.includes('wan-2.5')) return [5, 6, 7, 8, 9, 10];
    if (selectedModel.includes('wan-2.2')) return [5];
    if (selectedModel.includes('ltx-2-fast')) return [6, 8, 10, 12, 15, 20];
    if (selectedModel.includes('ltx-2-full')) return [6, 8, 10];
    if (selectedModel.includes('longcat')) return [5, 10, 15, 20, 25, 30];
    if (selectedModel.includes('kling')) return [5, 6, 7, 8, 9, 10];
    if (selectedModel.includes('veo3')) return [4, 6, 8];
    return [4, 6, 8, 10, 12];
  };

  const getResolutionOptions = () => {
    if (selectedModel.includes('ltx-2')) return ['720p', '1080p', '2160p'];
    if (selectedModel.includes('sora-2-pro') || selectedModel.includes('veo3')) return ['720p', '1080p'];
    if (selectedModel.includes('sora-2') || selectedModel.includes('longcat')) return ['720p'];
    if (selectedModel.includes('wan')) return ['480p'];
    return ['720p', '1080p'];
  };

  const durationOptions = getDurationOptions();
  const resolutionOptions = getResolutionOptions();

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-emerald-400">
        <Settings2 size={20} />
        Parameters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Aspect Ratio
          </label>
          <select
            name="aspect_ratio"
            value={config.aspect_ratio}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="16:9">16:9 (Widescreen)</option>
            <option value="9:16">9:16 (Vertical)</option>
            <option value="1:1">1:1 (Square)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Duration
          </label>
          <select
            name="duration"
            value={config.duration}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {durationOptions.map(d => (
              <option key={d} value={d}>{d} Seconds</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Resolution
          </label>
          <select
            name="resolution"
            value={config.resolution}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            {resolutionOptions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Style Preset
          </label>
          <select
            name="style_preset"
            value={config.style_preset}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="cinematic">Cinematic</option>
            <option value="anime">Anime</option>
            <option value="3d-model">3D Model</option>
            <option value="digital-art">Digital Art</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ParameterConfig;

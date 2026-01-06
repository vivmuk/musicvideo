import React from 'react';
import { Settings2, Sliders } from 'lucide-react';

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
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-violet-500/10 p-2 rounded-lg">
          <Sliders size={18} className="text-violet-400" />
        </div>
        <h2 className="text-lg font-semibold text-white tracking-tight">
          Configuration
        </h2>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="label-text">Aspect Ratio</label>
            <select
              name="aspect_ratio"
              value={config.aspect_ratio}
              onChange={handleChange}
              className="input-field w-full appearance-none cursor-pointer"
            >
              <option value="16:9">16:9 (Widescreen)</option>
              <option value="9:16">9:16 (Vertical)</option>
              <option value="1:1">1:1 (Square)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-text">Duration</label>
              <select
                name="duration"
                value={config.duration}
                onChange={handleChange}
                className="input-field w-full appearance-none cursor-pointer"
              >
                {durationOptions.map(d => (
                  <option key={d} value={d}>{d}s</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Resolution</label>
              <select
                name="resolution"
                value={config.resolution}
                onChange={handleChange}
                className="input-field w-full appearance-none cursor-pointer"
              >
                {resolutionOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label-text">Style Preset</label>
            <select
              name="style_preset"
              value={config.style_preset}
              onChange={handleChange}
              className="input-field w-full appearance-none cursor-pointer"
            >
              <option value="cinematic">Cinematic</option>
              <option value="anime">Anime</option>
              <option value="3d-model">3D Model</option>
              <option value="digital-art">Digital Art</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterConfig;

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  Clock,
  CheckCircle2,
  Download,
  ExternalLink,
  Play,
  Settings,
  X,
  RotateCcw
} from 'lucide-react';
import { useVeniceApi } from './hooks/useVeniceApi';

const MODELS = [
  { id: 'veo3-fast-text-to-video', name: 'Veo3 Fast', desc: '1080p • 4-8s • Audio' },
  { id: 'veo3-full-text-to-video', name: 'Veo3 Full', desc: '1080p • 4-8s • Audio' },
  { id: 'veo3.1-fast-text-to-video', name: 'Veo3.1 Fast', desc: '1080p • 4-8s • Audio' },
  { id: 'veo3.1-full-text-to-video', name: 'Veo3.1 Full', desc: '1080p • 4-8s • Audio' },
  { id: 'sora-2-text-to-video', name: 'Sora 2', desc: '720p • 4-12s • Audio' },
  { id: 'sora-2-pro-text-to-video', name: 'Sora 2 Pro', desc: '1080p • 4-12s • Audio' },
  { id: 'kling-2.6-pro-text-to-video', name: 'Kling 2.6 Pro', desc: '5-10s • Audio' },
  { id: 'ltx-2-fast-text-to-video', name: 'LTX-2 Fast', desc: '2160p • 6-20s • Audio' },
];

function App() {
  const { generatePrompt, queueVideo, checkStatus, loading, error } = useVeniceApi();

  const [theme, setTheme] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('veo3-fast-text-to-video');
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState({
    aspect_ratio: '16:9',
    duration: '8',
    resolution: '720p',
    style_preset: 'cinematic'
  });
  const [queue, setQueue] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Poll for status updates
  useEffect(() => {
    const activeItems = queue.filter(item =>
      item.status === 'PENDING' || item.status === 'PROCESSING'
    );
    if (activeItems.length === 0) return;

    const interval = setInterval(async () => {
      for (const item of activeItems) {
        try {
          const result = await checkStatus(item.requestId);
          if (result) {
            setQueue(prev => prev.map(q =>
              q.requestId === item.requestId ? { ...q, status: result.status } : q
            ));

            if (result.status === 'COMPLETED' && result.videoUrl) {
              setGallery(prev => {
                if (prev.some(v => v.requestId === item.requestId)) return prev;
                return [{
                  requestId: item.requestId,
                  url: result.videoUrl,
                  prompt: item.prompt,
                  timestamp: new Date().toISOString(),
                  thumbnail: result.thumbnailUrl
                }, ...prev];
              });
            }
          }
        } catch (err) {
          console.error('Status check error:', err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [queue, checkStatus]);

  const handleGeneratePrompt = async () => {
    if (!theme.trim()) return;
    try {
      const prompt = await generatePrompt(theme);
      setGeneratedPrompt(prompt);
    } catch (err) {
      console.error('Failed to generate prompt:', err);
    }
  };

  const handleCreateVideo = async () => {
    if (!generatedPrompt) return;
    try {
      const result = await queueVideo({
        model: selectedModel,
        prompt: generatedPrompt,
        ...config
      });

      if (result?.queue_id) {
        setQueue(prev => [{
          requestId: result.queue_id,
          prompt: generatedPrompt,
          status: 'PENDING',
          timestamp: new Date().toISOString()
        }, ...prev]);

        // Reset for new creation
        setTheme('');
        setGeneratedPrompt('');
      }
    } catch (err) {
      console.error('Failed to queue video:', err);
    }
  };

  const handleReset = () => {
    setTheme('');
    setGeneratedPrompt('');
  };

  const activeJobs = queue.filter(q => q.status === 'PENDING' || q.status === 'PROCESSING');

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="header">
        <div className="header-logo">Venice</div>
        <nav className="header-nav">
          {activeJobs.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
              <Loader2 size={14} className="spinner text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                {activeJobs.length} generating
              </span>
            </div>
          )}
          <button
            className="btn btn-ghost btn-icon"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} />
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="main-content">
        {/* Primary Panel - Creation Flow */}
        <div className="panel-primary">
          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
              <button
                className="ml-auto text-red-400 hover:text-red-600"
                onClick={() => window.location.reload()}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Step 1: Describe */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Create Video</h2>
              {generatedPrompt && (
                <button className="btn btn-ghost text-xs" onClick={handleReset}>
                  <RotateCcw size={14} />
                  Start Over
                </button>
              )}
            </div>

            {!generatedPrompt ? (
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label">Describe your video</label>
                  <textarea
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="A cinematic drone shot flying through a neon-lit Tokyo street at night, with rain reflections on the pavement and soft jazz playing..."
                    className="input-field"
                    rows={4}
                  />
                </div>
                <button
                  onClick={handleGeneratePrompt}
                  disabled={loading || !theme.trim()}
                  className="btn btn-primary btn-lg w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      Generating prompt...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Generate Cinematic Prompt
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="input-group">
                  <label className="input-label">Refine your prompt</label>
                  <textarea
                    value={generatedPrompt}
                    onChange={(e) => setGeneratedPrompt(e.target.value)}
                    className="input-field"
                    rows={6}
                  />
                </div>
                <button
                  onClick={handleCreateVideo}
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      Starting generation...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Create Video
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Active Jobs */}
          {activeJobs.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Generating</h2>
                <span className="card-subtitle">{activeJobs.length} in progress</span>
              </div>
              <div className="space-y-2">
                {activeJobs.map((job) => (
                  <div key={job.requestId} className="queue-item">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {job.prompt}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {job.requestId.slice(0, 8)}...
                      </p>
                    </div>
                    <div className={`status-badge ${
                      job.status === 'PENDING' ? 'status-pending' : 'status-processing'
                    }`}>
                      {job.status === 'PENDING' ? (
                        <><Clock size={12} /> Queued</>
                      ) : (
                        <><Loader2 size={12} className="spinner" /> Processing</>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Your Videos</h2>
              {gallery.length > 0 && (
                <span className="card-subtitle">{gallery.length} videos</span>
              )}
            </div>

            {gallery.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Play size={20} />
                </div>
                <p className="empty-state-title">No videos yet</p>
                <p className="empty-state-desc">
                  Your generated videos will appear here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map((video) => (
                  <div key={video.requestId} className="video-card">
                    <div className="video-wrapper">
                      <video
                        src={video.url}
                        controls
                        poster={video.thumbnail}
                      />
                    </div>
                    <div className="video-info">
                      <p className="video-prompt">{video.prompt}</p>
                      <div className="video-meta">
                        <span className="video-date">
                          {new Date(video.timestamp).toLocaleDateString()}
                        </span>
                        <div className="video-actions">
                          <a
                            href={video.url}
                            download
                            className="btn btn-secondary btn-icon"
                            title="Download"
                          >
                            <Download size={16} />
                          </a>
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-icon"
                            title="Open"
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
        </div>

        {/* Secondary Panel - Settings */}
        <div className="panel-secondary">
          {/* Model Selection */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Model</h2>
            </div>
            <div className="model-grid">
              {MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`model-option ${selectedModel === model.id ? 'selected' : ''}`}
                >
                  <span className="model-name">{model.name}</span>
                  <span className="model-desc">{model.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="setting-item">
                <label className="setting-label">Aspect Ratio</label>
                <select
                  value={config.aspect_ratio}
                  onChange={(e) => setConfig({...config, aspect_ratio: e.target.value})}
                  className="input-field select-field"
                >
                  <option value="16:9">16:9 Landscape</option>
                  <option value="9:16">9:16 Portrait</option>
                  <option value="1:1">1:1 Square</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="setting-item">
                  <label className="setting-label">Duration</label>
                  <select
                    value={config.duration}
                    onChange={(e) => setConfig({...config, duration: e.target.value})}
                    className="input-field select-field"
                  >
                    <option value="4">4 seconds</option>
                    <option value="6">6 seconds</option>
                    <option value="8">8 seconds</option>
                    <option value="10">10 seconds</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label className="setting-label">Resolution</label>
                  <select
                    value={config.resolution}
                    onChange={(e) => setConfig({...config, resolution: e.target.value})}
                    className="input-field select-field"
                  >
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <label className="setting-label">Style</label>
                <select
                  value={config.style_preset}
                  onChange={(e) => setConfig({...config, style_preset: e.target.value})}
                  className="input-field select-field"
                >
                  <option value="cinematic">Cinematic</option>
                  <option value="anime">Anime</option>
                  <option value="3d-model">3D Render</option>
                  <option value="digital-art">Digital Art</option>
                </select>
              </div>
            </div>
          </div>

          {/* Queue History */}
          {queue.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">History</h2>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {queue.map((item) => (
                  <div key={item.requestId} className="flex items-center gap-3 py-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      item.status === 'COMPLETED' ? 'bg-green-500' :
                      item.status === 'FAILED' ? 'bg-red-500' :
                      item.status === 'PROCESSING' ? 'bg-blue-500 pulse' :
                      'bg-amber-500'
                    }`} />
                    <span className="text-sm text-neutral-600 truncate flex-1">
                      {item.prompt.slice(0, 40)}...
                    </span>
                    <span className="text-xs text-neutral-400">
                      {item.status === 'COMPLETED' ? (
                        <CheckCircle2 size={14} className="text-green-500" />
                      ) : item.status === 'FAILED' ? (
                        <AlertCircle size={14} className="text-red-500" />
                      ) : (
                        <Loader2 size={14} className="spinner text-blue-500" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

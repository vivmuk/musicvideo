import React, { useState, useEffect } from 'react';
import { Music, Send, AlertCircle, Sparkles } from 'lucide-react';
import { useVeniceApi } from './hooks/useVeniceApi';
import ThemePrompt from './components/ThemePrompt';
import ModelSelector from './components/ModelSelector';
import ParameterConfig from './components/ParameterConfig';
import QueueDashboard from './components/QueueDashboard';
import MediaGallery from './components/MediaGallery';

function App() {
  const { generatePrompt, queueVideo, checkStatus, loading, error } = useVeniceApi();

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('veo3-fast-text-to-video');
  const [config, setConfig] = useState({
    aspect_ratio: '16:9',
    duration: '8',
    resolution: '720p',
    style_preset: 'cinematic'
  });

  const [queue, setQueue] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const activeItems = queue.filter(item => item.status === 'PENDING' || item.status === 'PROCESSING');
    if (activeItems.length === 0) return;

    const interval = setInterval(async () => {
      for (const item of activeItems) {
        try {
          const result = await checkStatus(item.requestId);
          if (result) {
            setQueue(prev => prev.map(qItem =>
              qItem.requestId === item.requestId
                ? { ...qItem, status: result.status }
                : qItem
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
          console.error(`Error checking status for ${item.requestId}:`, err);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [queue, checkStatus]);

  const handlePromptGenerated = (prompt) => {
    setGeneratedPrompt(prompt);
  };

  const handleQueueVideo = async () => {
    if (!generatedPrompt) return;

    try {
      const result = await queueVideo({
        model: selectedModel,
        prompt: generatedPrompt,
        ...config
      });

      if (result && result.queue_id) {
        setQueue(prev => [{
          requestId: result.queue_id,
          prompt: generatedPrompt,
          status: 'PENDING',
          timestamp: new Date().toISOString()
        }, ...prev]);
      }
    } catch (err) {
      console.error('Failed to queue video:', err);
    }
  };

  return (
    <div className="app-container">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#3A9B9B] to-[#2A7B7B] rounded-full border-2 border-[#5D4E37] shadow-[4px_4px_0_#5D4E37]">
              <Music size={28} className="text-[#FFFEF9]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#3D3D3D] tracking-tight">
                Venice
              </h1>
              <p className="text-sm font-semibold text-[#5D4E37] uppercase tracking-widest">
                Music Video Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 bg-[#FFFEF9] rounded-full border-2 border-[#5D4E37] shadow-[3px_3px_0_#5D4E37]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B7B4C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6B7B4C]"></span>
            </span>
            <span className="text-xs font-bold text-[#5D4E37] uppercase tracking-widest">
              System Online
            </span>
          </div>
        </header>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-4 bg-[#FFFEF9] border-2 border-[#E07B54] rounded-xl flex items-center gap-4 shadow-[4px_4px_0_#5D4E37]">
            <div className="w-10 h-10 flex items-center justify-center bg-[#E07B54] rounded-full flex-shrink-0">
              <AlertCircle size={20} className="text-[#FFFEF9]" />
            </div>
            <p className="text-sm font-semibold text-[#5D4E37]">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <ThemePrompt
              onPromptGenerated={handlePromptGenerated}
              generatePrompt={generatePrompt}
              loading={loading}
            />

            {generatedPrompt && (
              <div className="mcm-card p-6 sm:p-8">
                <div className="section-header">
                  <div className="icon-wrap">
                    <Sparkles size={20} className="text-[#FFFEF9]" />
                  </div>
                  <h2>Refine Your Vision</h2>
                </div>

                <textarea
                  value={generatedPrompt}
                  onChange={(e) => setGeneratedPrompt(e.target.value)}
                  className="input-field min-h-[160px] mb-6"
                  placeholder="Your generated prompt will appear here..."
                />

                <button
                  onClick={handleQueueVideo}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  <Send size={18} />
                  <span>Create Video</span>
                </button>
              </div>
            )}

            <MediaGallery videos={gallery} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />
            <ParameterConfig
              config={config}
              onConfigChange={setConfig}
              selectedModel={selectedModel}
            />
            <QueueDashboard queue={queue} />
          </div>
        </div>

        {/* Footer Divider */}
        <div className="mcm-divider mt-16">
          <div className="dot"></div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-semibold text-[#5D4E37]">
            &copy; 2026 Venice Music Video Studio
          </p>
          <div className="flex items-center gap-6 font-semibold">
            <span className="text-[#5D4E37] hover:text-[#2A7B7B] cursor-pointer transition-colors uppercase tracking-wider text-xs">
              Terms
            </span>
            <span className="text-[#D4A72C]">•</span>
            <span className="text-[#5D4E37] hover:text-[#2A7B7B] cursor-pointer transition-colors uppercase tracking-wider text-xs">
              Privacy
            </span>
            <span className="text-[#D4A72C]">•</span>
            <span className="text-[#7A6B54] uppercase tracking-wider text-xs">
              Powered by Venice AI
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

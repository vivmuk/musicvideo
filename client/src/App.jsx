import React, { useState, useEffect, useCallback } from 'react';
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

  // Polling logic for active queue items
  useEffect(() => {
    const activeItems = queue.filter(item => item.status === 'PENDING' || item.status === 'PROCESSING');
    if (activeItems.length === 0) return;

    const interval = setInterval(async () => {
      for (const item of activeItems) {
        try {
          const result = await checkStatus(item.requestId);
          if (result) {
            // Update queue status
            setQueue(prev => prev.map(qItem =>
              qItem.requestId === item.requestId
                ? { ...qItem, status: result.status }
                : qItem
            ));

            // If completed, add to gallery
            if (result.status === 'COMPLETED' && result.videoUrl) {
              setGallery(prev => {
                // Avoid duplicates
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
    <div className="min-h-screen p-4 md:p-8 lg:p-12">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-32 h-16 bg-[#D4A72C] rounded-[80px_80px_80px_20px] opacity-10 transform -rotate-12 pointer-events-none" />
      <div className="fixed bottom-40 right-20 w-24 h-24 bg-[#2A7B7B] rounded-full opacity-10 pointer-events-none" />
      <div className="fixed top-1/2 left-5 w-20 h-10 bg-[#6B7B4C] rounded-[40px_40px_40px_10px] opacity-10 transform rotate-45 pointer-events-none" />

      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Logo with starburst decoration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#2A7B7B] to-[#3A9B9B] p-4 rounded-full border-3 border-[#5D4E37] shadow-[4px_4px_0_#5D4E37]">
              <Music size={32} className="text-[#FFFEF9]" />
            </div>
            {/* Starburst decorations */}
            <span className="absolute -top-2 -right-2 text-[#D4A72C] text-2xl">✦</span>
            <span className="absolute -bottom-1 -left-2 text-[#D4A72C] text-lg">✦</span>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#3D3D3D]" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              Venice
            </h1>
            <p className="text-[#5D4E37] font-semibold tracking-widest text-sm uppercase" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              Music Video Studio
            </p>
          </div>
        </div>

        {/* Status indicator - retro dial style */}
        <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#FFFEF9] to-[#F5F0E6] rounded-full border-2 border-[#5D4E37] shadow-[3px_3px_0_#5D4E37]">
          <div className="relative">
            <div className="w-3 h-3 bg-[#6B7B4C] rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-[#6B7B4C] rounded-full animate-ping opacity-50" />
          </div>
          <span className="text-xs font-bold text-[#5D4E37] uppercase tracking-widest" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            System Online
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {error && (
          <div className="mb-8 bg-gradient-to-r from-[#E07B54]/20 to-[#E07B54]/10 border-2 border-[#E07B54] p-5 rounded-[20px_8px_20px_8px] flex items-center gap-4 shadow-[4px_4px_0_#5D4E37]">
            <div className="bg-[#E07B54] p-2 rounded-full">
              <AlertCircle size={20} className="text-[#FFFEF9]" />
            </div>
            <p className="text-sm font-semibold text-[#5D4E37]" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column: Input & Config */}
          <div className="lg:col-span-8 space-y-8">
            <ThemePrompt
              onPromptGenerated={handlePromptGenerated}
              generatePrompt={generatePrompt}
              loading={loading}
            />

            {generatedPrompt && (
              <div className="mcm-card p-8 relative overflow-hidden">
                {/* Decorative kidney shape */}
                <div className="absolute -bottom-10 -right-10 w-40 h-20 bg-[#D4A72C] rounded-[80px_80px_80px_20px] opacity-15 transform rotate-12" />

                <div className="section-header relative z-10">
                  <div className="icon-wrap">
                    <Sparkles size={18} className="text-[#FFFEF9]" />
                  </div>
                  <h2>Refine Your Vision</h2>
                </div>

                <textarea
                  value={generatedPrompt}
                  onChange={(e) => setGeneratedPrompt(e.target.value)}
                  className="w-full input-field min-h-[160px] mb-6 resize-none relative z-10"
                  placeholder="Your generated prompt will appear here..."
                />

                <button
                  onClick={handleQueueVideo}
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-3 relative z-10"
                >
                  <Send size={18} />
                  <span>Create Video</span>
                </button>
              </div>
            )}

            <MediaGallery videos={gallery} />
          </div>

          {/* Right Column: Settings & Queue */}
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
      </main>

      {/* Atomic age divider */}
      <div className="max-w-6xl mx-auto mt-16">
        <div className="atomic-divider">
          <div className="atom" />
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-8 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[#5D4E37]">
        <p className="text-sm font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
          &copy; 2026 Venice Music Video Studio
        </p>
        <div className="flex items-center gap-6 text-sm font-semibold" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
          <span className="hover:text-[#2A7B7B] cursor-pointer transition-colors uppercase tracking-wider">Terms</span>
          <span className="text-[#D4A72C]">✦</span>
          <span className="hover:text-[#2A7B7B] cursor-pointer transition-colors uppercase tracking-wider">Privacy</span>
          <span className="text-[#D4A72C]">✦</span>
          <span className="text-[#6B7B4C] uppercase tracking-wider">Powered by Venice AI</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

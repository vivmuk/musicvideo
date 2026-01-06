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
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-violet-600/20 p-3 rounded-2xl border border-violet-500/20">
            <Music size={32} className="text-violet-500" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">Venice</h1>
            <p className="text-zinc-500 font-medium">Music Video Studio</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">System Online</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Input & Config */}
          <div className="lg:col-span-8 space-y-12">
            <ThemePrompt 
              onPromptGenerated={handlePromptGenerated} 
              generatePrompt={generatePrompt}
              loading={loading}
            />

            {generatedPrompt && (
              <div className="glass-card p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles size={18} className="text-violet-400" />
                  <h2 className="text-lg font-semibold text-white">Refine Prompt</h2>
                </div>
                <textarea
                  value={generatedPrompt}
                  onChange={(e) => setGeneratedPrompt(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl p-5 text-zinc-300 focus:ring-2 focus:ring-violet-500/50 outline-none min-h-[160px] mb-6 transition-all resize-none"
                  placeholder="Your generated prompt will appear here..."
                />
                <button
                  onClick={handleQueueVideo}
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-3"
                >
                  <Send size={18} />
                  Generate Video
                </button>
              </div>
            )}

            <MediaGallery videos={gallery} />
          </div>

          {/* Right Column: Settings & Queue */}
          <div className="lg:col-span-4 space-y-12">
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

      <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-medium">
        <p>&copy; 2026 Venice Music Video Studio</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">Privacy</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-400">Powered by Venice AI</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback } from 'react';
import { Music, Send, AlertCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Music size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Venice Music Video Studio</h1>
            <p className="text-slate-400 text-sm">AI-Powered Cinematic Video Generation</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/50 p-4 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input & Config */}
          <div className="lg:col-span-2 space-y-8">
            <ThemePrompt 
              onPromptGenerated={handlePromptGenerated} 
              generatePrompt={generatePrompt}
              loading={loading}
            />

            {generatedPrompt && (
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold mb-4 text-blue-400">Generated Prompt</h2>
                <textarea
                  value={generatedPrompt}
                  onChange={(e) => setGeneratedPrompt(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none min-h-[120px] mb-4"
                />
                <button
                  onClick={handleQueueVideo}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  <Send size={20} />
                  Queue Video Generation
                </button>
              </div>
            )}

            <MediaGallery videos={gallery} />
          </div>

          {/* Right Column: Settings & Queue */}
          <div className="space-y-8">
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

      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        &copy; 2026 Venice Music Video Studio. Powered by Venice AI.
      </footer>
    </div>
  );
}

export default App;

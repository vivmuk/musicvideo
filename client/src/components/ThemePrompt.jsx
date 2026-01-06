import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';

const ThemePrompt = ({ onPromptGenerated, generatePrompt, loading }) => {
  const [theme, setTheme] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!theme.trim()) return;
    
    try {
      const prompt = await generatePrompt(theme);
      onPromptGenerated(prompt);
    } catch (err) {
      console.error('Error generating prompt:', err);
    }
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-violet-500/10 p-2 rounded-lg">
          <Wand2 size={20} className="text-violet-400" />
        </div>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Creative Engine
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label-text">
            Describe your vision
          </label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., A neon-lit cyberpunk city in the rain with flying cars and synthwave vibes..."
            className="w-full bg-black/40 border border-white/5 rounded-xl p-5 text-zinc-300 focus:ring-2 focus:ring-violet-500/50 outline-none transition-all min-h-[120px] resize-none placeholder:text-zinc-600"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !theme.trim()}
          className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-violet-600"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Architecting Prompt...</span>
            </>
          ) : (
            <>
              <Sparkles size={18} />
              <span>Generate Cinematic Prompt</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ThemePrompt;

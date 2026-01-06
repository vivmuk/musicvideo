import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

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
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
        <Sparkles size={20} />
        Theme-to-Prompt Engine
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Describe your music video theme
          </label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., A neon-lit cyberpunk city in the rain with flying cars and synthwave vibes..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[100px]"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !theme.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Generating Prompt...
            </>
          ) : (
            'Generate Cinematic Prompt'
          )}
        </button>
      </form>
    </div>
  );
};

export default ThemePrompt;

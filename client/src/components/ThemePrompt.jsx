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
    <div className="mcm-card p-6 sm:p-8">
      <div className="section-header">
        <div className="icon-wrap">
          <Wand2 size={20} className="text-[#FFFEF9]" />
        </div>
        <h2>Creative Engine</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label-text">
            Describe Your Vision
          </label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., A sunny California beach scene with vintage cars, palm trees swaying, and couples dancing to rock and roll..."
            className="input-field min-h-[140px]"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !theme.trim()}
          className="btn-primary w-full"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Crafting Your Prompt...</span>
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

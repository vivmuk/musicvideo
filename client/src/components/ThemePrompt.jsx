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
    <div className="mcm-card p-8 relative overflow-hidden">
      {/* Decorative boomerang shape */}
      <div className="absolute -top-6 -right-6 w-24 h-12 bg-[#2A7B7B] rounded-[60px_60px_0_0] opacity-20 transform -rotate-25 pointer-events-none" />

      {/* Decorative kidney bean */}
      <div className="absolute -bottom-8 -left-8 w-32 h-16 bg-[#D4A72C] rounded-[60px_60px_60px_15px] opacity-15 transform rotate-15 pointer-events-none" />

      <div className="section-header relative z-10">
        <div className="icon-wrap">
          <Wand2 size={20} className="text-[#FFFEF9]" />
        </div>
        <h2>Creative Engine</h2>
        <span className="ml-auto text-[#D4A72C] text-xl">✦</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="label-text">
            Describe Your Vision
          </label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g., A sunny California beach scene with vintage cars, palm trees swaying, and couples dancing to rock and roll..."
            className="w-full input-field min-h-[140px] resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !theme.trim()}
          className="btn-primary w-full flex items-center justify-center gap-3"
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

      {/* Decorative starburst */}
      <div className="absolute bottom-4 right-4 text-[#6B7B4C] opacity-30 text-3xl pointer-events-none">✺</div>
    </div>
  );
};

export default ThemePrompt;

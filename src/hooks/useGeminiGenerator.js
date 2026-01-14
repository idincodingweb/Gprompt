import { useState, useEffect } from 'react';

export const useGeminiGenerator = () => {
  // State Utama
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [mimeType, setMimeType] = useState('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [promptResult, setPromptResult] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [mode, setMode] = useState('midjourney');
  const [language, setLanguage] = useState('english');
  const [history, setHistory] = useState([]);
  
  // --- API KEY ---
  
 const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 

  // Load History saat mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('promptHistory');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
  }, []);

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Mohon upload file gambar (JPG, PNG, WEBP).');
      return;
    }
    setError('');
    setPromptResult('');
    setMimeType(file.type);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      setImageBase64(e.target.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const saveToHistory = (imgPreview, text, selectedMode) => {
    const newItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      preview: imgPreview,
      result: text,
      mode: selectedMode
    };
    // Simpan 10 item terakhir
    const newHistory = [newItem, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('promptHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptHistory');
  };

  const generatePrompt = async () => {
    if (!imageBase64) return;
    setLoading(true);
    setError('');
    setPromptResult('');

    try {
      let instructionText = "Analyze this image in extreme detail.";
      const langInstruction = language === 'indonesian' 
        ? "Output the main description in Indonesian language." 
        : "Output the prompt text in English.";

      if (mode === 'midjourney') {
        instructionText += ` Write a prompt optimized for Midjourney v6. Include subject details, artistic style, lighting, camera angle, materials, and colors. ${langInstruction} HOWEVER, keep technical parameters like --ar 16:9 --v 6.0 --style raw at the end intact.`;
      } else if (mode === 'stable-diffusion') {
        instructionText += ` Write a prompt optimized for Stable Diffusion using comma-separated tags. Focus on: subject, art style, medium, lighting, 8k. ${langInstruction} Note: Keep standard technical tags in English.`;
      } else {
        instructionText += ` Provide a rich, narrative description of the image. ${langInstruction}`;
      }

      const payload = {
        contents: [{ parts: [{ text: instructionText }, { inlineData: { mimeType: mimeType, data: imageBase64 } }] }]
      };

      // Retry Logic (Exponential Backoff)
      let attempt = 0;
      const maxRetries = 5;
      let success = false;
      let generatedText = '';

      while (attempt < maxRetries && !success) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }
          );

          if (!response.ok) throw new Error(response.statusText);
          const data = await response.json();
          generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) success = true;
          else throw new Error("No text generated.");

        } catch (err) {
          attempt++;
          if (attempt >= maxRetries) throw err;
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
        }
      }

      setPromptResult(generatedText);
      saveToHistory(image, generatedText, mode);

    } catch (err) {
      console.error(err);
      setError(`Gagal menghubungi AI. Silakan coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    if (text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return {
    image, setImage, imageBase64, loading, promptResult, setPromptResult,
    error, copySuccess, mode, setMode, language, setLanguage, history,
    processFile, generatePrompt, clearHistory, copyToClipboard
  };
};

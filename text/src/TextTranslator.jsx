import React, { useState } from 'react';
import { Globe, ArrowRight, Copy, Check } from 'lucide-react';

const TextTranslator = () => {
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('es');
    const [isTranslating, setIsTranslating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const translateText = async () => {
        if (!inputText.trim()) return;

        setIsTranslating(true);
        setError('');
        setTranslatedText('');

        try {
            const url = 'https://google-translator9.p.rapidapi.com/v2';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': '4192e2a19dmsh860cccb12407734p1b58c3jsn371fc1f4c411',
                    'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    q: inputText,
                    source: 'en',
                    target: targetLanguage,
                    format: 'text'
                })
            };

            const response = await fetch(url, options);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Translation failed');
            }

            if (result.data && result.data.translations && result.data.translations[0]) {
                setTranslatedText(result.data.translations[0].translatedText);
            } else {
                throw new Error('Unexpected response format');
            }

        } catch (err) {
            setError(err.message || 'Translation failed. API might be unavailable. Showing demo translation.');
            console.error('Translation error:', err);



        } finally {
            setIsTranslating(false);
        }
    };

    const copyToClipboard = async () => {
        if (translatedText) {
            try {
                await navigator.clipboard.writeText(translatedText);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
        }
    };

    const languages = [
        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
        { code: 'fr', name: 'French', flag: '🇫🇷' },
        { code: 'de', name: 'German', flag: '🇩🇪' },
        { code: 'it', name: 'Italian', flag: '🇮🇹' },
        { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
        { code: 'zh-cn', name: 'Chinese (Simplified)', flag: '🇨🇳' },
        { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
        { code: 'ko', name: 'Korean', flag: '🇰🇷' },
        { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
        { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Text Translator</h1>

                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🇺🇸</span>
                                <h3 className="text-lg font-semibold text-gray-700">English</h3>
                            </div>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Enter text to translate..."
                                className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <div className="text-sm text-gray-500">
                                {inputText.length} characters
                            </div>
                        </div>


                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <select
                                    value={targetLanguage}
                                    onChange={(e) => setTargetLanguage(e.target.value)}
                                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                >
                                    {languages.map(lang => (
                                        <option key={lang.code} value={lang.code}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={translatedText}
                                    readOnly
                                    placeholder="Translation will appear here..."
                                    className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg resize-none bg-gray-50"
                                />
                                {translatedText && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                                        aria-label="Copy translation"
                                    >
                                        {copied ? <Check size={20} /> : <Copy size={20} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700">{error}</p>
                            <p className="text-sm text-red-600 mt-1">
                                Note: Add your RapidAPI key to enable live translation. Currently showing demo translation.
                            </p>
                        </div>
                    )}

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={translateText}
                            disabled={!inputText.trim() || isTranslating}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 text-lg font-semibold"
                        >
                            <Globe size={24} />
                            <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TextTranslator;
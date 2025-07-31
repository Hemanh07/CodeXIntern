import React, { useState, useCallback, useEffect } from 'react';
import { Shuffle, Copy, Check, RefreshCw, Settings } from 'lucide-react';

const RandomStringGenerator = () => {
    const [randomString, setRandomString] = useState('');
    const [stringLength, setStringLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [copied, setCopied] = useState(false);
    const [history, setHistory] = useState([]);

    // Generate random string using useCallback
    const generateRandomString = useCallback(() => {
        let characters = '';
        if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) characters += '0123456789';
        if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (characters === '') {
            alert('Please select at least one character type!');
            return;
        }

        let result = '';
        for (let i = 0; i < stringLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        setRandomString(result);

        // Add to history using useState
        setHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 strings
    }, [stringLength, includeNumbers, includeSymbols, includeUppercase, includeLowercase]);

    // Copy to clipboard functionality
    const copyToClipboard = useCallback(async () => {
        if (randomString) {
            await navigator.clipboard.writeText(randomString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [randomString]);

    // Auto-generate on component mount using useEffect
    useEffect(() => {
        generateRandomString();
    }, []);

    // Reset all settings
    const resetSettings = () => {
        setStringLength(12);
        setIncludeNumbers(true);
        setIncludeSymbols(false);
        setIncludeUppercase(true);
        setIncludeLowercase(true);
        setHistory([]);
        setRandomString('');
    };

    const getStrengthColor = () => {
        let score = 0;
        if (includeLowercase) score++;
        if (includeUppercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;

        if (stringLength >= 16 && score >= 3) return 'text-green-600';
        if (stringLength >= 12 && score >= 2) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getStrengthText = () => {
        let score = 0;
        if (includeLowercase) score++;
        if (includeUppercase) score++;
        if (includeNumbers) score++;
        if (includeSymbols) score++;

        if (stringLength >= 16 && score >= 3) return 'Very Strong';
        if (stringLength >= 12 && score >= 2) return 'Strong';
        if (stringLength >= 8 && score >= 2) return 'Medium';
        return 'Weak';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Random String Generator</h1>

                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Settings Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                            <div className="flex items-center space-x-2">
                                <Settings className="text-gray-600" size={20} />
                                <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    String Length: {stringLength}
                                </label>
                                <input
                                    type="range"
                                    min="4"
                                    max="50"
                                    value={stringLength}
                                    onChange={(e) => setStringLength(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>4</span>
                                    <span>50</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-700">Include Characters:</h4>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeLowercase}
                                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">Lowercase (a-z)</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeUppercase}
                                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">Uppercase (A-Z)</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeNumbers}
                                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">Numbers (0-9)</span>
                                </label>

                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeSymbols}
                                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">Symbols (!@#$%)</span>
                                </label>
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Strength:</span>
                                    <span className={`text-sm font-medium ${getStrengthColor()}`}>
                                        {getStrengthText()}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={resetSettings}
                                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                            >
                                <RefreshCw size={16} />
                                <span>Reset Settings</span>
                            </button>
                        </div>
                    </div>

                    {/* Generator Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="text-center mb-6">
                                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                    <div className="text-sm text-gray-500 mb-2">Generated String:</div>
                                    <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-4 min-h-[60px] flex items-center justify-center relative">
                                        {randomString ? (
                                            <>
                                                <span className="font-mono text-lg break-all text-center">{randomString}</span>
                                                <button
                                                    onClick={copyToClipboard}
                                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                >
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-400">Click generate to create a random string</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={generateRandomString}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
                                    >
                                        <Shuffle size={20} />
                                        <span>Generate New String</span>
                                    </button>

                                    {randomString && (
                                        <button
                                            onClick={copyToClipboard}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                        >
                                            {copied ? <Check size={20} /> : <Copy size={20} />}
                                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* History */}
                            {history.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Strings</h3>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {history.map((str, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 rounded-lg p-3 flex items-center justify-between group hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="font-mono text-sm truncate flex-1 mr-2">{str}</span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(str)}
                                                    className="text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <Copy size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default RandomStringGenerator;
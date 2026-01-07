'use client';

import { useState } from 'react';
import { Recipe } from '@/lib/types';
import { ChevronLeft, ChevronRight, Play, Pause, Mic, MicOff } from 'lucide-react';

interface CookingModeProps {
  recipe: Recipe;
}

export default function CookingMode({ recipe }: CookingModeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const instruction = recipe.instructions[currentStep];
  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      // Would integrate with Web Speech API here
      console.log('Voice control enabled');
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('next')) {
      nextStep();
    } else if (lowerCommand.includes('previous') || lowerCommand.includes('back')) {
      previousStep();
    } else if (lowerCommand.includes('repeat')) {
      // Read current step aloud
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(instruction.text);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Counter */}
      <div className="bg-gray-50 px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {recipe.instructions.length}
          </span>
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title={voiceEnabled ? 'Voice control enabled' : 'Enable voice control'}
          >
            {voiceEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 min-h-[400px] flex flex-col justify-center">
        {instruction.image && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={instruction.image}
              alt={`Step ${currentStep + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="text-center mb-8">
          <div className="text-3xl font-semibold text-gray-900 leading-relaxed">
            {instruction.text}
          </div>
          
          {instruction.duration && (
            <div className="mt-4 inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              ⏱️ {instruction.duration} minutes
            </div>
          )}
        </div>

        {voiceEnabled && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
            <p className="text-sm text-blue-800">
              🎤 Voice commands: "Next", "Previous", "Repeat"
            </p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={previousStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex gap-2">
            {recipe.instructions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-primary-600'
                    : index < currentStep
                    ? 'bg-primary-300'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === recipe.instructions.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-primary-700"
          >
            {currentStep === recipe.instructions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Recommendation } from '../types';
import { Settings, User, Target, Brain, CheckCircle } from 'lucide-react';

interface RecommendationOutputProps {
  recommendation: Recommendation | null;
}

export const RecommendationOutput: React.FC<RecommendationOutputProps> = ({ recommendation }) => {
  if (!recommendation) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-8">
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-industrial-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-industrial-600 mb-2">No Recommendation Available</h3>
          <p className="text-industrial-500">Enter fabric specifications to get a recommendation</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-8">
      <div className="flex items-center mb-6">
        <Target className="w-6 h-6 text-industrial-600 mr-3" />
        <h2 className="text-xl font-semibold text-industrial-900">Recommendation</h2>
      </div>

      <div className="space-y-6">
        {/* Suitability Score */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(recommendation.suitabilityScore)} mb-4`}>
            <span className={`text-3xl font-bold ${getScoreColor(recommendation.suitabilityScore)}`}>
              {recommendation.suitabilityScore}
            </span>
          </div>
          <p className="text-sm font-medium text-industrial-600 uppercase tracking-wide">Suitability Score</p>
        </div>

        {/* Recommended Machine */}
        <div className="border border-industrial-200 rounded-lg p-6 bg-industrial-50">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-industrial-600 mr-2" />
            <h3 className="font-semibold text-industrial-900">Recommended Machine</h3>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-industrial-800">{recommendation.machine.name}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-industrial-600 text-white text-sm rounded-full capitalize">
                {recommendation.machine.type}
              </span>
              <span className="px-3 py-1 bg-industrial-200 text-industrial-700 text-sm rounded-full">
                {recommendation.machine.maxSpeed} speed
              </span>
              <span className="px-3 py-1 bg-industrial-200 text-industrial-700 text-sm rounded-full">
                {recommendation.machine.strengthHandling} strength
              </span>
            </div>
          </div>
        </div>

        {/* Recommended Worker */}
        <div className="border border-industrial-200 rounded-lg p-6 bg-industrial-50">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-industrial-600 mr-2" />
            <h3 className="font-semibold text-industrial-900">Recommended Worker</h3>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-industrial-800">{recommendation.worker.name}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                Skill: {recommendation.worker.skillLevel}/10
              </span>
              {recommendation.worker.knotSpecialization.map((spec) => (
                <span key={spec} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full capitalize">
                  {spec} specialist
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="border border-industrial-200 rounded-lg p-6 bg-blue-50">
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-industrial-900">Why This Was Recommended</h3>
          </div>
          <p className="text-industrial-700 leading-relaxed">
            {recommendation.explanation}
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-900">Optimal Performance</p>
              <p className="text-xs text-green-700">Best machine-fabric match</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Skill Alignment</p>
              <p className="text-xs text-blue-700">Worker expertise matched</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-industrial-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-industrial-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-industrial-900">Risk Minimized</p>
              <p className="text-xs text-industrial-700">Lower breakage probability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

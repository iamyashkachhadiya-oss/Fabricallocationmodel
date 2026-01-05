import React from 'react';
import { Recommendation } from '../types';
import { Settings, User, Target, Brain, CheckCircle, AlertTriangle, TrendingDown, Clock } from 'lucide-react';

interface EnhancedRecommendationOutputProps {
  recommendation: Recommendation | null;
}

export const EnhancedRecommendationOutput: React.FC<EnhancedRecommendationOutputProps> = ({ recommendation }) => {
  if (!recommendation) {
    return (
      <div className="card-premium flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Brain className="w-16 h-16 text-industrial-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-industrial-600 mb-2">No Recommendation Available</h3>
          <p className="text-industrial-500">Enter fabric specifications to get knowledge-based recommendation</p>
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ideal': return 'bg-green-100 text-green-800 border-green-200';
      case 'acceptable': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'risky': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevel = (risk: number) => {
    if (risk <= 20) return { level: 'Low', color: 'text-green-600' };
    if (risk <= 40) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'High', color: 'text-red-600' };
  };

  return (
    <div className="card-premium">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 text-purple-600 mr-3" />
        <h2 className="text-xl font-semibold text-industrial-900">Knowledge-Based Recommendation</h2>
      </div>

      <div className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(recommendation.suitabilityScore)} mb-4`}>
            <span className={`text-3xl font-bold ${getScoreColor(recommendation.suitabilityScore)}`}>
              {recommendation.suitabilityScore}
            </span>
          </div>
          <p className="text-sm font-medium text-industrial-600 uppercase tracking-wide">Suitability Score</p>
          <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(recommendation.compatibility.category)}`}>
            {recommendation.compatibility.category.toUpperCase()}
          </div>
        </div>

        {/* Recommended Machine */}
        <div className="border border-industrial-200 rounded-lg p-6 bg-industrial-50">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-industrial-600 mr-2" />
            <h3 className="font-semibold text-industrial-900">Recommended Machine</h3>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-medium text-industrial-800">{recommendation.machine.name}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-industrial-600 text-white text-sm rounded-full capitalize">
                {recommendation.machine.type}
              </span>
              <span className="px-3 py-1 bg-industrial-200 text-industrial-700 text-sm rounded-full">
                {recommendation.machine.maxSpeed} speed
              </span>
              <span className="px-3 py-1 bg-industrial-200 text-industrial-700 text-sm rounded-full">
                {recommendation.machine.maxRPM} RPM max
              </span>
            </div>
            
            {/* Machine Strengths */}
            <div className="mt-4">
              <p className="text-sm font-medium text-industrial-700 mb-2">Key Strengths:</p>
              <ul className="text-xs text-industrial-600 space-y-1">
                {recommendation.machine.strengths.slice(0, 3).map((strength, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Worker */}
        <div className="border border-industrial-200 rounded-lg p-6 bg-industrial-50">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-industrial-600 mr-2" />
            <h3 className="font-semibold text-industrial-900">Recommended Worker</h3>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-medium text-industrial-800">{recommendation.worker.name}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                Skill: {recommendation.worker.skillLevel}/10
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {recommendation.worker.experience} years experience
              </span>
            </div>
            
            {/* Worker Skills */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="text-xs">
                <span className="font-medium text-industrial-700">Airjet Tuning:</span>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-industrial-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${recommendation.worker.airJetTuning * 10}%` }}
                    />
                  </div>
                  <span className="ml-2 text-industrial-600">{recommendation.worker.airJetTuning}/10</span>
                </div>
              </div>
              <div className="text-xs">
                <span className="font-medium text-industrial-700">Rapier Setup:</span>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-industrial-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${recommendation.worker.rapierSetup * 10}%` }}
                    />
                  </div>
                  <span className="ml-2 text-industrial-600">{recommendation.worker.rapierSetup}/10</span>
                </div>
              </div>
              <div className="text-xs">
                <span className="font-medium text-industrial-700">Fancy Yarn:</span>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-industrial-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${recommendation.worker.fancyYarnHandling * 10}%` }}
                    />
                  </div>
                  <span className="ml-2 text-industrial-600">{recommendation.worker.fancyYarnHandling}/10</span>
                </div>
              </div>
              <div className="text-xs">
                <span className="font-medium text-industrial-700">High Speed:</span>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-industrial-200 rounded-full h-2">
                    <div 
                      className="bg-orange-600 h-2 rounded-full" 
                      style={{ width: `${recommendation.worker.highSpeedTroubleshooting * 10}%` }}
                    />
                  </div>
                  <span className="ml-2 text-industrial-600">{recommendation.worker.highSpeedTroubleshooting}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Factory Constraints */}
        <div className="border border-industrial-200 rounded-lg p-6 bg-orange-50">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="font-semibold text-industrial-900">Factory Reality Check</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-industrial-700">Speed Reduction</p>
              <p className={`text-lg font-bold ${getRiskLevel(recommendation.factoryConstraints.speedReduction).color}`}>
                {recommendation.factoryConstraints.speedReduction}%
              </p>
            </div>
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-industrial-700">Quality Risk</p>
              <p className={`text-lg font-bold ${getRiskLevel(recommendation.factoryConstraints.qualityRisk).color}`}>
                {recommendation.factoryConstraints.qualityRisk}%
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-industrial-700">Feasibility</p>
              <p className={`text-lg font-bold ${getScoreColor(recommendation.factoryConstraints.feasibilityScore)}`}>
                {recommendation.factoryConstraints.feasibilityScore}%
              </p>
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

        {/* Compatibility Reasons */}
        {recommendation.compatibility.reasons.length > 0 && (
          <div className="border border-industrial-200 rounded-lg p-6 bg-gray-50">
            <h3 className="font-semibold text-industrial-900 mb-4">Technical Considerations</h3>
            <ul className="space-y-2">
              {recommendation.compatibility.reasons.map((reason, index) => (
                <li key={index} className="flex items-start text-sm text-industrial-700">
                  <span className="w-2 h-2 bg-industrial-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Fabric } from '../types';
import { Package, Gauge, Ruler, Layers, Tag, Info, ChevronDown, Brain } from 'lucide-react';

interface PremiumFabricFormProps {
  onFabricSubmit: (fabric: Fabric) => void;
  isAnalyzing?: boolean;
}

export const PremiumFabricForm: React.FC<PremiumFabricFormProps> = ({ onFabricSubmit, isAnalyzing = false }) => {
  const [fabric, setFabric] = useState<Partial<Fabric>>({
    material: 'cotton',
    warpYarnCount: 30,
    weftYarnCount: 30,
    gsm: 180,
    width: 150,
    weaveType: 'plain',
    qualityPriority: 'balanced',
    endUse: 'apparel',
    warpYarnType: 'spun',
    weftYarnType: 'spun',
    epi: 60,
    ppi: 60
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fabric.material && fabric.warpYarnCount && fabric.weftYarnCount && 
        fabric.gsm && fabric.width && fabric.weaveType && fabric.qualityPriority &&
        fabric.endUse && fabric.warpYarnType && fabric.weftYarnType) {
      onFabricSubmit(fabric as Fabric);
    }
  };

  const updateFabric = (field: keyof Fabric, value: any) => {
    setFabric(prev => ({ ...prev, [field]: value }));
  };

  const materialOptions = [
    { value: 'cotton', label: 'Cotton', color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'polyester', label: 'Polyester', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'viscose', label: 'Viscose', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'linen', label: 'Linen', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'blend', label: 'Blend', color: 'bg-industrial-100 text-industrial-800 border-industrial-200' }
  ];

  const endUseOptions = [
    { value: 'apparel', label: 'Apparel', icon: '👔' },
    { value: 'home_textile', label: 'Home Textile', icon: '🏠' },
    { value: 'denim', label: 'Denim', icon: '👖' },
    { value: 'industrial', label: 'Industrial', icon: '🏭' }
  ];

  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white mr-4">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-industrial-900">Fabric Specifications</h2>
            <p className="text-industrial-600 flex items-center mt-1">
              <Info className="w-4 h-4 mr-1" />
              Enter detailed fabric parameters for accurate analysis
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Properties */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-industrial-800 flex items-center">
            <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">1</span>
            Basic Properties
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Material */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                Fabric Material
              </label>
              <div className="relative">
                <select
                  value={fabric.material}
                  onChange={(e) => updateFabric('material', e.target.value)}
                  className="input-premium appearance-none cursor-pointer"
                >
                  {materialOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-industrial-400 pointer-events-none" />
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${materialOptions.find(opt => opt.value === fabric.material)?.color}`}>
                {materialOptions.find(opt => opt.value === fabric.material)?.label}
              </div>
            </div>

            {/* End Use */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                <Tag className="inline w-4 h-4 mr-1" />
                End Use Application
              </label>
              <div className="relative">
                <select
                  value={fabric.endUse}
                  onChange={(e) => updateFabric('endUse', e.target.value)}
                  className="input-premium appearance-none cursor-pointer"
                >
                  {endUseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-industrial-400 pointer-events-none" />
              </div>
            </div>

            {/* Weave Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                Weave Structure
              </label>
              <div className="relative">
                <select
                  value={fabric.weaveType}
                  onChange={(e) => updateFabric('weaveType', e.target.value)}
                  className="input-premium appearance-none cursor-pointer"
                >
                  <option value="plain">Plain Weave</option>
                  <option value="twill">Twill Weave</option>
                  <option value="satin">Satin Weave</option>
                  <option value="jersey">Jersey Knit</option>
                  <option value="dobby">Dobby</option>
                  <option value="jacquard">Jacquard</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-industrial-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Yarn Properties */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-industrial-800 flex items-center">
            <span className="w-8 h-8 bg-success-100 text-success-700 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">2</span>
            Yarn Properties
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                Warp Yarn Type
              </label>
              <div className="relative">
                <select
                  value={fabric.warpYarnType}
                  onChange={(e) => updateFabric('warpYarnType', e.target.value)}
                  className="input-premium appearance-none cursor-pointer"
                >
                  <option value="spun">Spun Yarn</option>
                  <option value="filament">Filament Yarn</option>
                  <option value="fancy">Fancy Yarn</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-industrial-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                Weft Yarn Type
              </label>
              <div className="relative">
                <select
                  value={fabric.weftYarnType}
                  onChange={(e) => updateFabric('weftYarnType', e.target.value)}
                  className="input-premium appearance-none cursor-pointer"
                >
                  <option value="spun">Spun Yarn</option>
                  <option value="filament">Filament Yarn</option>
                  <option value="fancy">Fancy Yarn</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-industrial-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                <Gauge className="inline w-4 h-4 mr-1" />
                Warp Yarn Count
              </label>
              <input
                type="number"
                min="10"
                max="200"
                value={fabric.warpYarnCount}
                onChange={(e) => updateFabric('warpYarnCount', parseInt(e.target.value))}
                className="input-premium"
              />
              <span className="text-xs text-industrial-500">Ne, Ne, or Tex count</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                <Gauge className="inline w-4 h-4 mr-1" />
                Weft Yarn Count
              </label>
              <input
                type="number"
                min="10"
                max="200"
                value={fabric.weftYarnCount}
                onChange={(e) => updateFabric('weftYarnCount', parseInt(e.target.value))}
                className="input-premium"
              />
              <span className="text-xs text-industrial-500">Ne, Ne, or Tex count</span>
            </div>
          </div>
        </div>

        {/* Physical Properties */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-industrial-800 flex items-center">
            <span className="w-8 h-8 bg-warning-100 text-warning-700 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">3</span>
            Physical Properties
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                <Layers className="inline w-4 h-4 mr-1" />
                GSM (g/m²)
              </label>
              <input
                type="number"
                min="50"
                max="800"
                value={fabric.gsm}
                onChange={(e) => updateFabric('gsm', parseInt(e.target.value))}
                className="input-premium"
              />
              <span className="text-xs text-industrial-500">Fabric weight</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                <Ruler className="inline w-4 h-4 mr-1" />
                Fabric Width (cm)
              </label>
              <input
                type="number"
                min="100"
                max="600"
                value={fabric.width}
                onChange={(e) => updateFabric('width', parseInt(e.target.value))}
                className="input-premium"
              />
              <span className="text-xs text-industrial-500">Finished width</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                EPI (Ends/inch)
              </label>
              <input
                type="number"
                min="20"
                max="200"
                value={fabric.epi}
                onChange={(e) => updateFabric('epi', parseInt(e.target.value))}
                className="input-premium"
              />
              <span className="text-xs text-industrial-500">Warp density</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-industrial-700 mb-3">
                PPI (Picks/inch)
              </label>
              <input
                type="number"
                min="20"
                max="200"
                value={fabric.ppi}
                onChange={(e) => updateFabric('ppi', parseInt(e.target.value))}
                className="input-premium"
              />
              <span className="text-xs text-industrial-500">Weft density</span>
            </div>
          </div>
        </div>

        {/* Quality Requirements */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-industrial-800 flex items-center">
            <span className="w-8 h-8 bg-accent-100 text-accent-700 rounded-lg flex items-center justify-center mr-3 text-sm font-bold">4</span>
            Quality Requirements
          </h3>
          
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-industrial-700 mb-4">
              Production Priority
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['low', 'balanced', 'premium'] as const).map((priority) => (
                <label key={priority} className="relative">
                  <input
                    type="radio"
                    name="quality"
                    value={priority}
                    checked={fabric.qualityPriority === priority}
                    onChange={(e) => updateFabric('qualityPriority', e.target.value)}
                    className="sr-only peer"
                  />
                  <div className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                    ${fabric.qualityPriority === priority 
                      ? 'border-primary-500 bg-primary-50 shadow-glow' 
                      : 'border-industrial-200 hover:border-primary-300 hover:bg-primary-50/30'
                    }
                  `}>
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300
                        ${fabric.qualityPriority === priority 
                          ? 'border-primary-600 bg-primary-600' 
                          : 'border-industrial-300'
                        }
                      `}>
                        {fabric.qualityPriority === priority && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold capitalize text-industrial-800">{priority}</div>
                        <div className="text-xs text-industrial-600 mt-1">
                          {priority === 'low' && 'High volume, standard quality'}
                          {priority === 'balanced' && 'Optimal balance of speed and quality'}
                          {priority === 'premium' && 'Maximum quality, optimized production'}
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <div className="loading-dots mr-3">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                Analyzing Fabric Properties...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Brain className="w-5 h-5 mr-2" />
                Generate Knowledge-Based Recommendation
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

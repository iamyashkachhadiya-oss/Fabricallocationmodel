import React, { useState } from 'react';
import { Fabric } from '../types';
import { Package, Gauge, Ruler, Layers } from 'lucide-react';

interface FabricInputFormProps {
  onFabricSubmit: (fabric: Fabric) => void;
}

export const FabricInputForm: React.FC<FabricInputFormProps> = ({ onFabricSubmit }) => {
  const [fabric, setFabric] = useState<Partial<Fabric>>({
    material: 'cotton',
    warpYarnCount: 30,
    weftYarnCount: 30,
    gsm: 180,
    width: 150,
    weaveType: 'plain',
    qualityPriority: 'balanced'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fabric.material && fabric.warpYarnCount && fabric.weftYarnCount && 
        fabric.gsm && fabric.width && fabric.weaveType && fabric.qualityPriority) {
      onFabricSubmit(fabric as Fabric);
    }
  };

  const updateFabric = (field: keyof Fabric, value: any) => {
    setFabric(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-8">
      <div className="flex items-center mb-6">
        <Package className="w-6 h-6 text-industrial-600 mr-3" />
        <h2 className="text-xl font-semibold text-industrial-900">Fabric Specifications</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              Fabric Material
            </label>
            <select
              value={fabric.material}
              onChange={(e) => updateFabric('material', e.target.value)}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            >
              <option value="cotton">Cotton</option>
              <option value="polyester">Polyester</option>
              <option value="viscose">Viscose</option>
              <option value="linen">Linen</option>
              <option value="blend">Blend</option>
            </select>
          </div>

          {/* Weave Type */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              Weave Type
            </label>
            <select
              value={fabric.weaveType}
              onChange={(e) => updateFabric('weaveType', e.target.value)}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            >
              <option value="plain">Plain</option>
              <option value="twill">Twill</option>
              <option value="satin">Satin</option>
              <option value="jersey">Jersey</option>
            </select>
          </div>

          {/* Warp Yarn Count */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              <Gauge className="inline w-4 h-4 mr-1" />
              Warp Yarn Count
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={fabric.warpYarnCount}
              onChange={(e) => updateFabric('warpYarnCount', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>

          {/* Weft Yarn Count */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              <Gauge className="inline w-4 h-4 mr-1" />
              Weft Yarn Count
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={fabric.weftYarnCount}
              onChange={(e) => updateFabric('weftYarnCount', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>

          {/* GSM */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              <Layers className="inline w-4 h-4 mr-1" />
              GSM (g/m²)
            </label>
            <input
              type="number"
              min="50"
              max="500"
              value={fabric.gsm}
              onChange={(e) => updateFabric('gsm', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>

          {/* Fabric Width */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              <Ruler className="inline w-4 h-4 mr-1" />
              Fabric Width (cm)
            </label>
            <input
              type="number"
              min="50"
              max="300"
              value={fabric.width}
              onChange={(e) => updateFabric('width', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>

          {/* Quality Priority */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              Quality Priority
            </label>
            <div className="flex space-x-4">
              {(['low', 'balanced', 'premium'] as const).map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="quality"
                    value={priority}
                    checked={fabric.qualityPriority === priority}
                    onChange={(e) => updateFabric('qualityPriority', e.target.value)}
                    className="mr-2 text-industrial-600 focus:ring-industrial-500"
                  />
                  <span className="capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-industrial-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-industrial-700 transition-colors duration-200"
        >
          Get Recommendation
        </button>
      </form>
    </div>
  );
};

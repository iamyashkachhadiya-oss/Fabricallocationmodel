import React, { useState } from 'react';
import { Fabric } from '../types';
import { Package, Gauge, Ruler, Layers, Tag } from 'lucide-react';

interface EnhancedFabricInputFormProps {
  onFabricSubmit: (fabric: Fabric) => void;
}

export const EnhancedFabricInputForm: React.FC<EnhancedFabricInputFormProps> = ({ onFabricSubmit }) => {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-industrial-200 p-8">
      <div className="flex items-center mb-6">
        <Package className="w-6 h-6 text-industrial-600 mr-3" />
        <h2 className="text-xl font-semibold text-industrial-900">Fabric Specifications</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* End Use */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              <Tag className="inline w-4 h-4 mr-1" />
              End Use
            </label>
            <select
              value={fabric.endUse}
              onChange={(e) => updateFabric('endUse', e.target.value)}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            >
              <option value="apparel">Apparel</option>
              <option value="home_textile">Home Textile</option>
              <option value="denim">Denim</option>
              <option value="industrial">Industrial</option>
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
              <option value="dobby">Dobby</option>
              <option value="jacquard">Jacquard</option>
            </select>
          </div>

          {/* Warp Yarn Type */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              Warp Yarn Type
            </label>
            <select
              value={fabric.warpYarnType}
              onChange={(e) => updateFabric('warpYarnType', e.target.value)}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            >
              <option value="spun">Spun</option>
              <option value="filament">Filament</option>
              <option value="fancy">Fancy</option>
            </select>
          </div>

          {/* Weft Yarn Type */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              Weft Yarn Type
            </label>
            <select
              value={fabric.weftYarnType}
              onChange={(e) => updateFabric('weftYarnType', e.target.value)}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            >
              <option value="spun">Spun</option>
              <option value="filament">Filament</option>
              <option value="fancy">Fancy</option>
            </select>
          </div>

          {/* Quality Priority */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              Quality Priority
            </label>
            <select
              value={fabric.qualityPriority}
              onChange={(e) => updateFabric('qualityPriority', e.target.value)}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            >
              <option value="low">Low</option>
              <option value="balanced">Balanced</option>
              <option value="premium">Premium</option>
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
              max="200"
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
              max="200"
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
              max="800"
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
              min="100"
              max="600"
              value={fabric.width}
              onChange={(e) => updateFabric('width', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>

          {/* EPI */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              EPI (Ends per inch)
            </label>
            <input
              type="number"
              min="20"
              max="200"
              value={fabric.epi}
              onChange={(e) => updateFabric('epi', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>

          {/* PPI */}
          <div>
            <label className="block text-sm font-medium text-industrial-700 mb-2">
              PPI (Picks per inch)
            </label>
            <input
              type="number"
              min="20"
              max="200"
              value={fabric.ppi}
              onChange={(e) => updateFabric('ppi', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-industrial-300 rounded-lg focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-industrial-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-industrial-700 transition-colors duration-200"
        >
          Get Knowledge-Based Recommendation
        </button>
      </form>
    </div>
  );
};

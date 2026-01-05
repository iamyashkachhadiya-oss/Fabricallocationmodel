import React, { useState } from 'react';
import { Machine } from '../types';
import { Settings, Plus, Trash2 } from 'lucide-react';

interface MachineManagementProps {
  machines: Machine[];
  onMachinesUpdate: (machines: Machine[]) => void;
}

export const MachineManagement: React.FC<MachineManagementProps> = ({ machines, onMachinesUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMachine, setNewMachine] = useState<Partial<Machine>>({
    name: '',
    type: 'rapier',
    maxSpeed: 'medium',
    suitableFabrics: ['cotton'],
    strengthHandling: 'medium',
    powerUsage: 'medium'
  });

  const updateNewMachine = (field: keyof Machine, value: any) => {
    setNewMachine(prev => ({ ...prev, [field]: value }));
  };

  const toggleFabricType = (fabric: string) => {
    const fabrics = newMachine.suitableFabrics || [];
    if (fabrics.includes(fabric as any)) {
      updateNewMachine('suitableFabrics', fabrics.filter(f => f !== fabric));
    } else {
      updateNewMachine('suitableFabrics', [...fabrics, fabric]);
    }
  };

  const handleAddMachine = () => {
    if (newMachine.name && newMachine.type) {
      const machine: Machine = {
        id: Date.now().toString(),
        name: newMachine.name,
        type: newMachine.type,
        maxSpeed: newMachine.maxSpeed || 'medium',
        suitableFabrics: newMachine.suitableFabrics || ['cotton'],
        strengthHandling: newMachine.strengthHandling || 'medium',
        powerUsage: newMachine.powerUsage || 'medium',
        maxRPM: newMachine.maxSpeed === 'high' ? 800 : newMachine.maxSpeed === 'medium' ? 500 : 300,
        maxGSM: 400,
        minWidth: 140,
        maxWidth: 340,
        energyEfficiency: 5,
        maintenanceComplexity: 5,
        setupTime: 3,
        realWorldLimitations: [],
        strengths: [],
        idealUseCases: []
      };
      onMachinesUpdate([...machines, machine]);
      setNewMachine({
        name: '',
        type: 'rapier',
        maxSpeed: 'medium',
        suitableFabrics: ['cotton'],
        strengthHandling: 'medium',
        powerUsage: 'medium'
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteMachine = (id: string) => {
    onMachinesUpdate(machines.filter(machine => machine.id !== id));
  };

  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-success-500 to-success-600 rounded-lg text-white mr-4">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-industrial-900">Machine Fleet</h2>
            <p className="text-industrial-600">Manage your weaving machine inventory</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Machine
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-6 bg-industrial-50 rounded-xl border border-industrial-200">
          <h3 className="text-lg font-semibold text-industrial-800 mb-4">Add New Machine</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Machine Name"
              value={newMachine.name}
              onChange={(e) => updateNewMachine('name', e.target.value)}
              className="input-premium"
            />
            <select
              value={newMachine.type}
              onChange={(e) => updateNewMachine('type', e.target.value)}
              className="input-premium"
            >
              <option value="rapier">Rapier</option>
              <option value="airjet">Airjet</option>
              <option value="projectile">Projectile</option>
              <option value="waterjet">Waterjet</option>
            </select>
            <select
              value={newMachine.maxSpeed}
              onChange={(e) => updateNewMachine('maxSpeed', e.target.value)}
              className="input-premium"
            >
              <option value="low">Low Speed</option>
              <option value="medium">Medium Speed</option>
              <option value="high">High Speed</option>
            </select>
            <select
              value={newMachine.strengthHandling}
              onChange={(e) => updateNewMachine('strengthHandling', e.target.value)}
              className="input-premium"
            >
              <option value="thin">Thin Yarn</option>
              <option value="medium">Medium Yarn</option>
              <option value="thick">Thick Yarn</option>
            </select>
            <select
              value={newMachine.powerUsage}
              onChange={(e) => updateNewMachine('powerUsage', e.target.value)}
              className="input-premium"
            >
              <option value="low">Low Power</option>
              <option value="medium">Medium Power</option>
              <option value="high">High Power</option>
            </select>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-industrial-700 mb-2">Suitable Fabrics</label>
              <div className="flex flex-wrap gap-2">
                {['cotton', 'polyester', 'viscose', 'linen', 'blend'].map((fabric) => (
                  <label key={fabric} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newMachine.suitableFabrics?.includes(fabric as any)}
                      onChange={() => toggleFabricType(fabric)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-industrial-700 capitalize">{fabric}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddMachine}
              className="btn-primary"
            >
              Add Machine
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {machines.map((machine) => (
          <div key={machine.id} className="card hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-industrial-100 rounded-lg">
                  <Settings className="w-5 h-5 text-industrial-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-industrial-900">{machine.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="badge-primary capitalize">{machine.type}</span>
                    <span className="text-sm text-industrial-500">{machine.maxSpeed} speed</span>
                    <span className="text-sm text-industrial-500">{machine.maxRPM} RPM max</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteMachine(machine.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

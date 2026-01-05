import React, { useState } from 'react';
import { Worker, Machine } from '../types';
import { Users, Plus, Trash2, Star, Award } from 'lucide-react';

interface WorkerManagementProps {
  workers: Worker[];
  onWorkersUpdate: (workers: Worker[]) => void;
}

export const WorkerManagement: React.FC<WorkerManagementProps> = ({ workers, onWorkersUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorker, setNewWorker] = useState<Partial<Worker>>({
    name: '',
    skillLevel: 5,
    knotSpecialization: [],
    preferredMachineTypes: []
  });

  const updateNewWorker = (field: keyof Worker, value: any) => {
    setNewWorker(prev => ({ ...prev, [field]: value }));
  };

  const toggleSpecialization = (machineType: string) => {
    const specializations = newWorker.knotSpecialization || [];
    if (specializations.includes(machineType as any)) {
      updateNewWorker('knotSpecialization', specializations.filter(s => s !== machineType));
    } else {
      updateNewWorker('knotSpecialization', [...specializations, machineType]);
    }
  };

  const togglePreferredMachine = (machineType: string) => {
    const preferred = newWorker.preferredMachineTypes || [];
    if (preferred.includes(machineType as any)) {
      updateNewWorker('preferredMachineTypes', preferred.filter(p => p !== machineType));
    } else {
      updateNewWorker('preferredMachineTypes', [...preferred, machineType]);
    }
  };

  const handleAddWorker = () => {
    if (newWorker.name && newWorker.skillLevel) {
      const worker: Worker = {
        id: Date.now().toString(),
        name: newWorker.name,
        skillLevel: newWorker.skillLevel,
        knotSpecialization: newWorker.knotSpecialization || [],
        preferredMachineTypes: newWorker.preferredMachineTypes || [],
        airJetTuning: newWorker.airJetTuning || 5,
        rapierSetup: newWorker.rapierSetup || 5,
        fancyYarnHandling: newWorker.fancyYarnHandling || 5,
        highSpeedTroubleshooting: newWorker.highSpeedTroubleshooting || 5,
        experience: newWorker.experience || 5,
        certifications: newWorker.certifications || []
      };
      onWorkersUpdate([...workers, worker]);
      setNewWorker({
        name: '',
        skillLevel: 5,
        knotSpecialization: [],
        preferredMachineTypes: [],
        airJetTuning: 5,
        rapierSetup: 5,
        fancyYarnHandling: 5,
        highSpeedTroubleshooting: 5,
        experience: 5,
        certifications: []
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteWorker = (id: string) => {
    onWorkersUpdate(workers.filter(worker => worker.id !== id));
  };

  const machineTypes = ['rapier', 'airjet', 'projectile', 'waterjet', 'shuttle'];

  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg text-white mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-industrial-900">Expert Team</h2>
            <p className="text-industrial-600">Manage your specialized workforce</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Worker
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-6 bg-industrial-50 rounded-xl border border-industrial-200">
          <h3 className="text-lg font-semibold text-industrial-800 mb-4">Add New Worker</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Worker Name"
              value={newWorker.name}
              onChange={(e) => updateNewWorker('name', e.target.value)}
              className="input-premium"
            />
            <input
              type="number"
              min="1"
              max="10"
              placeholder="Skill Level (1-10)"
              value={newWorker.skillLevel}
              onChange={(e) => updateNewWorker('skillLevel', parseInt(e.target.value))}
              className="input-premium"
            />
            <input
              type="number"
              min="1"
              max="10"
              placeholder="Experience (years)"
              value={newWorker.experience}
              onChange={(e) => updateNewWorker('experience', parseInt(e.target.value))}
              className="input-premium"
            />
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-2">Airjet Tuning</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newWorker.airJetTuning}
                onChange={(e) => updateNewWorker('airJetTuning', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-industrial-600">{newWorker.airJetTuning}/10</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-2">Rapier Setup</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newWorker.rapierSetup}
                onChange={(e) => updateNewWorker('rapierSetup', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-industrial-600">{newWorker.rapierSetup}/10</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-industrial-700 mb-2">Fancy Yarn Handling</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newWorker.fancyYarnHandling}
                onChange={(e) => updateNewWorker('fancyYarnHandling', parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-industrial-600">{newWorker.fancyYarnHandling}/10</span>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-industrial-700 mb-2">Machine Specializations</label>
              <div className="flex flex-wrap gap-2">
                {machineTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newWorker.knotSpecialization?.includes(type as any)}
                      onChange={() => toggleSpecialization(type)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-industrial-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-industrial-700 mb-2">Preferred Machines</label>
              <div className="flex flex-wrap gap-2">
                {machineTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newWorker.preferredMachineTypes?.includes(type as any)}
                      onChange={() => togglePreferredMachine(type)}
                      className="mr-2 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-industrial-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddWorker}
              className="btn-primary"
            >
              Add Worker
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
        {workers.map((worker) => (
          <div key={worker.id} className="card hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-industrial-100 rounded-lg">
                  <Users className="w-5 h-5 text-industrial-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-industrial-900">{worker.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="badge-primary">Skill: {worker.skillLevel}/10</span>
                    <span className="text-sm text-industrial-500">{worker.experience} years experience</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {worker.knotSpecialization.map((spec) => (
                      <span key={spec} className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full capitalize">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteWorker(worker.id)}
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

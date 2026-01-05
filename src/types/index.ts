export interface Fabric {
  material: 'cotton' | 'polyester' | 'viscose' | 'linen' | 'blend';
  warpYarnCount: number;
  weftYarnCount: number;
  gsm: number;
  width: number;
  weaveType: 'plain' | 'twill' | 'satin' | 'jersey' | 'dobby' | 'jacquard';
  qualityPriority: 'low' | 'balanced' | 'premium';
  endUse: 'apparel' | 'home_textile' | 'denim' | 'industrial';
  warpYarnType: 'spun' | 'filament' | 'fancy';
  weftYarnType: 'spun' | 'filament' | 'fancy';
  epi?: number; // Ends per inch
  ppi?: number; // Picks per inch
}

export interface Machine {
  id: string;
  name: string;
  type: 'rapier' | 'airjet' | 'projectile' | 'waterjet' | 'shuttle';
  maxSpeed: 'low' | 'medium' | 'high';
  suitableFabrics: Fabric['material'][];
  strengthHandling: 'thin' | 'medium' | 'thick';
  powerUsage: 'low' | 'medium' | 'high';
  maxRPM: number;
  maxGSM: number;
  minWidth: number;
  maxWidth: number;
  energyEfficiency: number; // 1-10
  maintenanceComplexity: number; // 1-10
  setupTime: number; // hours
  realWorldLimitations: string[];
  strengths: string[];
  idealUseCases: string[];
}

export interface Worker {
  id: string;
  name: string;
  skillLevel: number; // 1-10
  knotSpecialization: Machine['type'][];
  preferredMachineTypes: Machine['type'][];
  airJetTuning: number; // 1-10
  rapierSetup: number; // 1-10
  fancyYarnHandling: number; // 1-10
  highSpeedTroubleshooting: number; // 1-10
  experience: number; // years
  certifications: string[];
}

export interface CompatibilityScore {
  machine: Machine;
  score: number;
  category: 'ideal' | 'acceptable' | 'risky' | 'avoid';
  reasons: string[];
  speedReduction: number; // percentage
  qualityRisk: number; // percentage
  costPenalty: number; // percentage
}

export interface Recommendation {
  machine: Machine;
  worker: Worker;
  suitabilityScore: number;
  explanation: string;
  compatibility: CompatibilityScore;
  factoryConstraints: {
    speedReduction: number;
    qualityRisk: number;
    costPenalty: number;
    feasibilityScore: number;
  };
}

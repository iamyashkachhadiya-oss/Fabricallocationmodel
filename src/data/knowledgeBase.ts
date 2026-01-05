import { Machine, Worker } from '../types';

// FABRIC CLASSIFICATION RULES
export const fabricClassificationRules = {
  gsmRanges: {
    veryLight: { min: 0, max: 100, label: 'Very Light' },
    light: { min: 100, max: 150, label: 'Light' },
    medium: { min: 150, max: 250, label: 'Medium' },
    heavy: { min: 250, max: 350, label: 'Heavy' },
    veryHeavy: { min: 350, max: 1000, label: 'Very Heavy' }
  },
  
  yarnCountRanges: {
    fine: { min: 60, max: 200, label: 'Fine' },
    medium: { min: 30, max: 60, label: 'Medium' },
    coarse: { min: 10, max: 30, label: 'Coarse' }
  },

  densityRules: {
    highEPIPPI: { threshold: 80, speedReduction: 0.3, qualityRisk: 0.2 },
    mediumEPIPPI: { threshold: 50, speedReduction: 0.15, qualityRisk: 0.1 },
    lowEPIPPI: { threshold: 30, speedReduction: 0, qualityRisk: 0 }
  },

  weaveComplexity: {
    plain: { complexity: 1, speedFactor: 1.0, setupTime: 1 },
    twill: { complexity: 2, speedFactor: 0.9, setupTime: 1.5 },
    satin: { complexity: 3, speedFactor: 0.8, setupTime: 2 },
    jersey: { complexity: 2, speedFactor: 0.85, setupTime: 1.5 },
    dobby: { complexity: 4, speedFactor: 0.7, setupTime: 3 },
    jacquard: { complexity: 5, speedFactor: 0.6, setupTime: 4 }
  }
};

// YARN BEHAVIOR RULES
export const yarnBehaviorRules = {
  fineYarn: {
    maxSpeed: 400,
    breakageRisk: {
      airjet: 0.8,
      rapier: 0.3,
      waterjet: 0.6,
      projectile: 0.4,
      shuttle: 0.2
    },
    hairinessImpact: 0.7,
    tensionSensitivity: 0.9
  },
  
  coarseYarn: {
    maxSpeed: 300,
    breakageRisk: {
      airjet: 0.9,
      rapier: 0.2,
      waterjet: 0.8,
      projectile: 0.3,
      shuttle: 0.1
    },
    airConsumption: 2.5,
    beatUpForce: 1.8
  },

  hairyYarn: {
    airjetCompatibility: 0.2,
    entanglementRisk: 0.7,
    cleaningFrequency: 3
  },

  lowTwistYarn: {
    jetSuitability: 0.1,
    breakageRisk: 0.8,
    recommendedMachines: ['rapier', 'shuttle']
  },

  fancyYarn: {
    suitableMachines: ['rapier', 'shuttle'],
    speedLimit: 250,
    setupComplexity: 3,
    defectRisk: {
      airjet: 0.9,
      waterjet: 0.9,
      projectile: 0.7,
      rapier: 0.3,
      shuttle: 0.2
    }
  }
};

// MACHINE KNOWLEDGE BASE
export const machineKnowledgeBase = {
  airjet: {
    strengths: [
      'High speed production',
      'Best for medium-count yarns',
      'Excellent for plain & simple twill',
      'Low labor requirement',
      'Consistent insertion'
    ],
    limitations: [
      'Poor with coarse yarns',
      'High air consumption with heavy fabrics',
      'Not suitable for hairy yarns',
      'High energy cost',
      'Sensitive to yarn quality variations',
      'Cannot handle fancy yarns'
    ],
    realWorldRules: [
      'IF yarn count < 30 → avoid airjet',
      'IF GSM > 250 → reduce speed 40%',
      'IF yarn hairiness high → avoid airjet',
      'IF fabric has fancy yarn → forbidden',
      'IF polyester filament → excellent choice'
    ],
    energyProfile: 'high',
    maintenanceComplexity: 6,
    setupTime: 2
  },

  rapier: {
    strengths: [
      'Most flexible machine',
      'Handles all yarn types',
      'Excellent for fancy yarns',
      'Multiple colors possible',
      'High GSM capability',
      'Complex weave patterns'
    ],
    limitations: [
      'Slower than airjet',
      'Higher selvedge waste',
      'Longer setup time',
      'Higher maintenance',
      'More moving parts'
    ],
    realWorldRules: [
      'IF fabric complexity high → prefer rapier',
      'IF order quantity small → rapier acceptable',
      'IF yarn delicate → rapier preferred',
      'IF multiple colors → rapier ideal',
      'IF GSM > 300 → rapier recommended'
    ],
    energyProfile: 'medium',
    maintenanceComplexity: 7,
    setupTime: 4
  },

  waterjet: {
    strengths: [
      'Very energy efficient',
      'Extremely high speed',
      'Perfect for polyester filament',
      'Low maintenance',
      'Quiet operation'
    ],
    limitations: [
      'Only hydrophobic fibers',
      'Cannot handle cotton/viscose',
      'Not suitable for fancy yarns',
      'Water treatment required',
      'Limited fabric types'
    ],
    realWorldRules: [
      'IF yarn hydrophilic → waterjet forbidden',
      'IF polyester filament → waterjet preferred',
      'IF fabric is technical → waterjet ideal',
      'IF moisture sensitive → avoid waterjet'
    ],
    energyProfile: 'low',
    maintenanceComplexity: 3,
    setupTime: 1.5
  },

  projectile: {
    strengths: [
      'Very wide fabrics possible',
      'Heavy fabric capability',
      'Stable insertion',
      'Constant energy regardless of width',
      'Good for technical fabrics'
    ],
    limitations: [
      'High maintenance cost',
      'Lower speed than jets',
      'Not suitable for delicate yarns',
      'Projectile wear issues',
      'Higher noise levels'
    ],
    realWorldRules: [
      'IF fabric width > 300cm → projectile preferred',
      'IF GSM > 400 → projectile allowed',
      'IF technical fabric → projectile good',
      'IF delicate yarn → avoid projectile'
    ],
    energyProfile: 'medium',
    maintenanceComplexity: 8,
    setupTime: 3
  },

  shuttle: {
    strengths: [
      'Real selvedge formation',
      'Denim heritage fabrics',
      'Very low tension',
      'Excellent for heavy fabrics',
      'Traditional fabric quality'
    ],
    limitations: [
      'Very low speed',
      'High labor dependency',
      'High noise levels',
      'Limited to simple patterns',
      'High maintenance'
    ],
    realWorldRules: [
      'IF selvedge value important → shuttle allowed',
      'IF denim heritage fabric → shuttle preferred',
      'IF speed not critical → shuttle acceptable',
      'IF traditional quality required → shuttle ideal'
    ],
    energyProfile: 'high',
    maintenanceComplexity: 9,
    setupTime: 6
  }
};

// REALISTIC MACHINE PROFILES
export const realisticMachines: Machine[] = [
  {
    id: '1',
    name: 'Picanol OmniPlus 800 Airjet',
    type: 'airjet',
    maxSpeed: 'high',
    suitableFabrics: ['polyester', 'blend'],
    strengthHandling: 'thin',
    powerUsage: 'high',
    maxRPM: 800,
    maxGSM: 250,
    minWidth: 140,
    maxWidth: 340,
    energyEfficiency: 4,
    maintenanceComplexity: 6,
    setupTime: 2,
    realWorldLimitations: [
      'Cannot handle yarns coarser than 30s',
      'High air consumption with GSM > 200',
      'Not suitable for hairy cotton',
      'Fancy yarns cause frequent stoppages'
    ],
    strengths: machineKnowledgeBase.airjet.strengths,
    idealUseCases: [
      'Polyester filament fabrics',
      'Medium weight apparel fabrics',
      'High volume production runs',
      'Simple weave patterns'
    ]
  },
  {
    id: '2',
    name: 'Dornier LWV 6/S Rapier',
    type: 'rapier',
    maxSpeed: 'medium',
    suitableFabrics: ['cotton', 'polyester', 'viscose', 'linen', 'blend'],
    strengthHandling: 'medium',
    powerUsage: 'medium',
    maxRPM: 550,
    maxGSM: 500,
    minWidth: 140,
    maxWidth: 360,
    energyEfficiency: 6,
    maintenanceComplexity: 7,
    setupTime: 4,
    realWorldLimitations: [
      'Slower than airjet for simple fabrics',
      'Higher selvedge waste (2-3cm)',
      'Complex setup for fancy yarns',
      'More moving parts = more downtime'
    ],
    strengths: machineKnowledgeBase.rapier.strengths,
    idealUseCases: [
      'Fancy yarn fabrics',
      'Multiple color patterns',
      'High GSM home textiles',
      'Complex weave structures',
      'Small batch production'
    ]
  },
  {
    id: '3',
    name: 'Tsudakoma ZW8100 Waterjet',
    type: 'waterjet',
    maxSpeed: 'high',
    suitableFabrics: ['polyester'],
    strengthHandling: 'thin',
    powerUsage: 'low',
    maxRPM: 850,
    maxGSM: 200,
    minWidth: 150,
    maxWidth: 340,
    energyEfficiency: 9,
    maintenanceComplexity: 3,
    setupTime: 1.5,
    realWorldLimitations: [
      'Only hydrophobic fibers',
      'Cannot process cotton/viscose',
      'Water treatment system required',
      'Limited to polyester filament'
    ],
    strengths: machineKnowledgeBase.waterjet.strengths,
    idealUseCases: [
      'Polyester filament fabrics',
      'Technical textiles',
      'High speed production',
      'Energy conscious production'
    ]
  },
  {
    id: '4',
    name: 'Gütermann Deimatic 8 Projectile',
    type: 'projectile',
    maxSpeed: 'low',
    suitableFabrics: ['cotton', 'polyester', 'linen', 'blend'],
    strengthHandling: 'thick',
    powerUsage: 'medium',
    maxRPM: 350,
    maxGSM: 600,
    minWidth: 180,
    maxWidth: 540,
    energyEfficiency: 5,
    maintenanceComplexity: 8,
    setupTime: 3,
    realWorldLimitations: [
      'High projectile wear cost',
      'Not suitable for fine yarns',
      'Lower speed than competitors',
      'Regular projectile replacement needed'
    ],
    strengths: machineKnowledgeBase.projectile.strengths,
    idealUseCases: [
      'Very wide fabrics',
      'Heavy technical textiles',
      'Industrial fabrics',
      'High GSM upholstery'
    ]
  },
  {
    id: '5',
    name: 'Toyota JAT710 Shuttle',
    type: 'shuttle',
    maxSpeed: 'low',
    suitableFabrics: ['cotton', 'linen', 'blend'],
    strengthHandling: 'thick',
    powerUsage: 'high',
    maxRPM: 180,
    maxGSM: 700,
    minWidth: 150,
    maxWidth: 280,
    energyEfficiency: 3,
    maintenanceComplexity: 9,
    setupTime: 6,
    realWorldLimitations: [
      'Very low speed',
      'High labor requirement',
      'Limited to simple patterns',
      'High noise levels'
    ],
    strengths: machineKnowledgeBase.shuttle.strengths,
    idealUseCases: [
      'Denim fabrics',
      'Traditional selvedge fabrics',
      'Heritage textiles',
      'High quality home textiles'
    ]
  }
];

// WORKER SPECIALIZATION RULES
export const workerSpecializationRules = {
  airJetExpert: {
    requiredSkills: ['airJetTuning', 'highSpeedTroubleshooting'],
    efficiencyBonus: 0.15,
    defectReduction: 0.2,
    speedIncrease: 0.1
  },
  rapierExpert: {
    requiredSkills: ['rapierSetup', 'fancyYarnHandling'],
    efficiencyBonus: 0.2,
    defectReduction: 0.25,
    setupTimeReduction: 0.3
  },
  fancyYarnSpecialist: {
    requiredSkills: ['fancyYarnHandling'],
    defectReduction: 0.4,
    wasteReduction: 0.3,
    qualityImprovement: 0.2
  },
  highSpeedOperator: {
    requiredSkills: ['highSpeedTroubleshooting'],
    speedIncrease: 0.15,
    breakageReduction: 0.3,
    efficiencyBonus: 0.1
  }
};

// REALISTIC WORKER PROFILES
export const realisticWorkers: Worker[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    skillLevel: 9,
    knotSpecialization: ['rapier', 'projectile'],
    preferredMachineTypes: ['rapier'],
    airJetTuning: 4,
    rapierSetup: 9,
    fancyYarnHandling: 8,
    highSpeedTroubleshooting: 6,
    experience: 15,
    certifications: ['Advanced Rapier Setup', 'Fancy Yarn Handling']
  },
  {
    id: '2',
    name: 'Maria Silva',
    skillLevel: 8,
    knotSpecialization: ['airjet', 'waterjet'],
    preferredMachineTypes: ['airjet'],
    airJetTuning: 9,
    rapierSetup: 5,
    fancyYarnHandling: 4,
    highSpeedTroubleshooting: 8,
    experience: 12,
    certifications: ['Airjet Optimization', 'High Speed Operations']
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    skillLevel: 7,
    knotSpecialization: ['rapier', 'waterjet'],
    preferredMachineTypes: ['waterjet', 'rapier'],
    airJetTuning: 6,
    rapierSetup: 7,
    fancyYarnHandling: 6,
    highSpeedTroubleshooting: 5,
    experience: 10,
    certifications: ['Waterjet Operations', 'Polyester Specialist']
  },
  {
    id: '4',
    name: 'Li Wei',
    skillLevel: 6,
    knotSpecialization: ['projectile'],
    preferredMachineTypes: ['projectile'],
    airJetTuning: 3,
    rapierSetup: 4,
    fancyYarnHandling: 5,
    highSpeedTroubleshooting: 4,
    experience: 8,
    certifications: ['Projectile Maintenance', 'Wide Fabric Specialist']
  },
  {
    id: '5',
    name: 'John Smith',
    skillLevel: 8,
    knotSpecialization: ['shuttle', 'rapier'],
    preferredMachineTypes: ['shuttle'],
    airJetTuning: 2,
    rapierSetup: 7,
    fancyYarnHandling: 6,
    highSpeedTroubleshooting: 3,
    experience: 20,
    certifications: ['Traditional Weaving', 'Denim Specialist', 'Selvedge Expert']
  }
];

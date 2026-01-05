import { Fabric, Machine, Worker, Recommendation, CompatibilityScore } from '../types';
import { 
  fabricClassificationRules, 
  yarnBehaviorRules, 
  machineKnowledgeBase,
  workerSpecializationRules 
} from '../data/knowledgeBase';

export class WeavingKnowledgeEngine {
  
  // FABRIC CLASSIFICATION
  private classifyFabric(fabric: Fabric) {
    const gsmCategory = this.getGSMCategory(fabric.gsm);
    const yarnCategory = this.getYarnCategory(fabric.warpYarnCount, fabric.weftYarnCount);
    const complexity = fabricClassificationRules.weaveComplexity[fabric.weaveType];
    
    return {
      gsmCategory,
      yarnCategory,
      complexity,
      density: this.calculateDensity(fabric),
      isHeavy: fabric.gsm > 250,
      isDense: (fabric.epi || 0) > 80 || (fabric.ppi || 0) > 80,
      isComplex: complexity.complexity > 2,
      hasFancyYarn: fabric.warpYarnType === 'fancy' || fabric.weftYarnType === 'fancy'
    };
  }

  private getGSMCategory(gsm: number) {
    for (const [key, range] of Object.entries(fabricClassificationRules.gsmRanges)) {
      if (gsm >= range.min && gsm < range.max) {
        return { key, ...range };
      }
    }
    return fabricClassificationRules.gsmRanges.veryHeavy;
  }

  private getYarnCategory(warpCount: number, weftCount: number) {
    const avgCount = (warpCount + weftCount) / 2;
    for (const [key, range] of Object.entries(fabricClassificationRules.yarnCountRanges)) {
      if (avgCount >= range.min && avgCount < range.max) {
        return { key, ...range };
      }
    }
    return fabricClassificationRules.yarnCountRanges.coarse;
  }

  private calculateDensity(fabric: Fabric) {
    const epi = fabric.epi || 60;
    const ppi = fabric.ppi || 60;
    return { epi, ppi, total: epi + ppi };
  }

  // YARN BEHAVIOR ANALYSIS
  private analyzeYarnBehavior(fabric: Fabric) {
    const avgYarnCount = (fabric.warpYarnCount + fabric.weftYarnCount) / 2;
    const isFine = avgYarnCount > 60;
    const isCoarse = avgYarnCount < 30;
    const hasFancyYarn = fabric.warpYarnType === 'fancy' || fabric.weftYarnType === 'fancy';
    
    let breakageRisk = 0.3;
    let airjetSuitability = 0.7;
    let rapierSuitability = 0.8;
    let waterjetSuitability = 0.5;
    let projectileSuitability = 0.6;
    let shuttleSuitability = 0.7;

    // Fine yarn rules
    if (isFine) {
      breakageRisk += 0.4;
      airjetSuitability -= 0.5;
      rapierSuitability -= 0.2;
    }

    // Coarse yarn rules
    if (isCoarse) {
      airjetSuitability -= 0.7;
      rapierSuitability -= 0.1;
      projectileSuitability -= 0.2;
    }

    // Fancy yarn rules
    if (hasFancyYarn) {
      airjetSuitability = 0.1;
      waterjetSuitability = 0.1;
      projectileSuitability = 0.3;
      rapierSuitability = 0.9;
      shuttleSuitability = 0.8;
      breakageRisk += 0.3;
    }

    // Material specific rules
    if (fabric.material === 'cotton' || fabric.material === 'viscose') {
      waterjetSuitability = 0; // Forbidden for hydrophilic fibers
    }

    if (fabric.material === 'polyester') {
      waterjetSuitability += 0.3;
      airjetSuitability += 0.2;
    }

    return {
      breakageRisk,
      machineSuitability: {
        airjet: Math.max(0, Math.min(1, airjetSuitability)),
        rapier: Math.max(0, Math.min(1, rapierSuitability)),
        waterjet: Math.max(0, Math.min(1, waterjetSuitability)),
        projectile: Math.max(0, Math.min(1, projectileSuitability)),
        shuttle: Math.max(0, Math.min(1, shuttleSuitability))
      },
      isFine,
      isCoarse,
      hasFancyYarn
    };
  }

  // MACHINE COMPATIBILITY MATRIX
  private calculateCompatibilityScore(machine: Machine, fabric: Fabric): CompatibilityScore {
    const fabricClass = this.classifyFabric(fabric);
    const yarnBehavior = this.analyzeYarnBehavior(fabric);
    
    let score = 50; // Base score
    const reasons: string[] = [];
    let speedReduction = 0;
    let qualityRisk = 0;
    let costPenalty = 0;

    // GSM compatibility
    if (fabric.gsm > machine.maxGSM) {
      score -= 30;
      speedReduction += 40;
      qualityRisk += 25;
      reasons.push(`GSM ${fabric.gsm} exceeds machine limit ${machine.maxGSM}`);
    } else if (fabric.gsm > machine.maxGSM * 0.8) {
      score -= 10;
      speedReduction += 20;
      reasons.push(`High GSM requires speed reduction`);
    }

    // Width compatibility
    if (fabric.width < machine.minWidth || fabric.width > machine.maxWidth) {
      score -= 50;
      reasons.push(`Fabric width ${fabric.width}cm incompatible with machine range ${machine.minWidth}-${machine.maxWidth}cm`);
    }

    // Yarn compatibility
    const yarnSuitability = yarnBehavior.machineSuitability[machine.type];
    score += (yarnSuitability - 0.5) * 40;
    
    if (yarnSuitability < 0.3) {
      qualityRisk += 30;
      speedReduction += 30;
      reasons.push(`Yarn type poorly suited for ${machine.type}`);
    } else if (yarnSuitability > 0.8) {
      score += 15;
      reasons.push(`Yarn type ideal for ${machine.type}`);
    }

    // Weave complexity
    const complexity = fabricClassificationRules.weaveComplexity[fabric.weaveType];
    if (complexity.complexity > 3 && machine.type === 'airjet') {
      score -= 20;
      speedReduction += 25;
      reasons.push(`Complex weave ${fabric.weaveType} challenging for airjet`);
    }

    if (complexity.complexity > 3 && machine.type === 'rapier') {
      score += 10;
      reasons.push(`Rapier handles complex ${fabric.weaveType} well`);
    }

    // Material specific rules
    if (machine.type === 'waterjet' && (fabric.material === 'cotton' || fabric.material === 'viscose')) {
      score -= 100; // Forbidden
      reasons.push(`Waterjet cannot process ${fabric.material} fibers`);
    }

    if (machine.type === 'airjet' && fabric.material === 'polyester') {
      score += 15;
      reasons.push(`Airjet excellent for polyester ${fabric.endUse}`);
    }

    // Real-world constraints
    if (fabricClass.isHeavy && machine.type === 'airjet') {
      speedReduction += 30;
      qualityRisk += 20;
      reasons.push(`Heavy fabric ${fabric.gsm}GSM challenges airjet`);
    }

    if (fabricClass.hasFancyYarn && !['rapier', 'shuttle'].includes(machine.type)) {
      score -= 40;
      qualityRisk += 35;
      reasons.push(`Fancy yarn requires rapier or shuttle`);
    }

    // Calculate category
    let category: 'ideal' | 'acceptable' | 'risky' | 'avoid';
    if (score >= 80) category = 'ideal';
    else if (score >= 60) category = 'acceptable';
    else if (score >= 40) category = 'risky';
    else category = 'avoid';

    return {
      machine,
      score: Math.max(0, Math.min(100, score)),
      category,
      reasons,
      speedReduction: Math.max(0, Math.min(100, speedReduction)),
      qualityRisk: Math.max(0, Math.min(100, qualityRisk)),
      costPenalty: Math.max(0, Math.min(100, costPenalty))
    };
  }

  // WORKER IMPACT ANALYSIS
  private calculateWorkerImpact(worker: Worker, machine: Machine, fabric: Fabric) {
    let efficiencyBonus = 0;
    let defectReduction = 0;
    let speedIncrease = 0;
    let setupTimeReduction = 0;

    // Machine specialization bonus
    if (worker.knotSpecialization.includes(machine.type)) {
      efficiencyBonus += 0.15;
      defectReduction += 0.2;
      speedIncrease += 0.1;
    }

    // Preferred machine bonus
    if (worker.preferredMachineTypes.includes(machine.type)) {
      efficiencyBonus += 0.1;
      setupTimeReduction += 0.2;
    }

    // Skill level impact
    const skillMultiplier = worker.skillLevel / 10;
    efficiencyBonus += skillMultiplier * 0.1;
    defectReduction += skillMultiplier * 0.15;

    // Specific skill bonuses
    if (machine.type === 'airjet' && worker.airJetTuning >= 8) {
      speedIncrease += 0.15;
      defectReduction += 0.15;
    }

    if (machine.type === 'rapier' && worker.rapierSetup >= 8) {
      setupTimeReduction += 0.3;
      defectReduction += 0.1;
    }

    // Fancy yarn handling
    const fabricClass = this.classifyFabric(fabric);
    if (fabricClass.hasFancyYarn && worker.fancyYarnHandling >= 7) {
      defectReduction += 0.25;
      efficiencyBonus += 0.2;
    }

    // High speed operations
    if (machine.maxSpeed === 'high' && worker.highSpeedTroubleshooting >= 7) {
      speedIncrease += 0.1;
      defectReduction += 0.1;
    }

    return {
      efficiencyBonus: Math.max(0, Math.min(0.5, efficiencyBonus)),
      defectReduction: Math.max(0, Math.min(0.5, defectReduction)),
      speedIncrease: Math.max(0, Math.min(0.3, speedIncrease)),
      setupTimeReduction: Math.max(0, Math.min(0.5, setupTimeReduction))
    };
  }

  // FACTORY CONSTRAINTS
  private applyFactoryConstraints(compatibility: CompatibilityScore, workerImpact: {
    efficiencyBonus: number;
    defectReduction: number;
    speedIncrease: number;
    setupTimeReduction: number;
  }) {
    let speedReduction = compatibility.speedReduction;
    let qualityRisk = compatibility.qualityRisk;
    let costPenalty = compatibility.costPenalty;

    // Worker improvements
    speedReduction *= (1 - workerImpact.speedIncrease);
    qualityRisk *= (1 - workerImpact.defectReduction);
    costPenalty *= (1 - workerImpact.efficiencyBonus);

    // Factory reality checks
    const feasibilityScore = 100 - (speedReduction * 0.4 + qualityRisk * 0.4 + costPenalty * 0.2);

    return {
      speedReduction: Math.max(0, Math.min(100, speedReduction)),
      qualityRisk: Math.max(0, Math.min(100, qualityRisk)),
      costPenalty: Math.max(0, Math.min(100, costPenalty)),
      feasibilityScore: Math.max(0, Math.min(100, feasibilityScore))
    };
  }

  // EXPLANATION GENERATION
  private generateExplanation(
    compatibility: CompatibilityScore, 
    worker: Worker, 
    fabric: Fabric,
    workerImpact: {
      efficiencyBonus: number;
      defectReduction: number;
      speedIncrease: number;
      setupTimeReduction: number;
    },
    factoryConstraints: {
      speedReduction: number;
      qualityRisk: number;
      costPenalty: number;
      feasibilityScore: number;
    }
  ): string {
    const reasons: string[] = [];
    const machine = compatibility.machine;
    const fabricClass = this.classifyFabric(fabric);
    const yarnBehavior = this.analyzeYarnBehavior(fabric);

    // Primary selection reason
    if (compatibility.category === 'ideal') {
      reasons.push(`${machine.name} provides ideal match for this ${fabric.material} ${fabric.endUse} fabric`);
    } else if (compatibility.category === 'acceptable') {
      reasons.push(`${machine.name} can handle this fabric with some adjustments`);
    } else if (compatibility.category === 'risky') {
      reasons.push(`${machine.name} is risky but may be necessary if no alternatives`);
    }

    // Machine-specific reasoning
    if (machine.type === 'airjet') {
      if (yarnBehavior.machineSuitability.airjet > 0.7) {
        reasons.push(`Airjet selected for high-speed production capability with ${fabric.material}`);
      } else {
        reasons.push(`Airjet chosen despite limitations due to production requirements`);
      }
    }

    if (machine.type === 'rapier') {
      if (fabricClass.hasFancyYarn || fabricClass.isComplex) {
        reasons.push(`Rapier essential for handling ${fabricClass.hasFancyYarn ? 'fancy yarns' : 'complex weave patterns'}`);
      }
      if (fabric.gsm > 300) {
        reasons.push(`Rapier better suited for heavy ${fabric.gsm}GSM fabric`);
      }
    }

    if (machine.type === 'waterjet') {
      reasons.push(`Waterjet chosen for energy efficiency with polyester ${fabric.endUse}`);
    }

    if (machine.type === 'projectile') {
      if (fabric.width > 300) {
        reasons.push(`Projectile required for wide ${fabric.width}cm fabric`);
      }
      if (fabric.gsm > 400) {
        reasons.push(`Projectile handles very heavy ${fabric.gsm}GSM fabric well`);
      }
    }

    // Worker impact reasoning
    if (worker.knotSpecialization.includes(machine.type)) {
      reasons.push(`${worker.name}'s ${machine.type} specialization reduces setup time and defect risk`);
    }

    if (worker.skillLevel >= 8) {
      reasons.push(`Worker's high skill level (${worker.skillLevel}/10) allows optimal machine performance`);
    }

    // Factory constraints
    if (factoryConstraints.speedReduction > 20) {
      reasons.push(`Speed reduction required due to fabric complexity and machine limitations`);
    }

    if (factoryConstraints.qualityRisk > 30) {
      reasons.push(`Higher quality risk accepted due to production constraints`);
    }

    // Final recommendation
    if (factoryConstraints.feasibilityScore > 70) {
      reasons.push(`Overall feasibility is good with proper setup and monitoring`);
    }

    return reasons.join('. ') + '.';
  }

  // MAIN RECOMMENDATION ENGINE
  public getRecommendation(fabric: Fabric, machines: Machine[], workers: Worker[]): Recommendation | null {
    // Calculate compatibility for all machines
    const compatibilities = machines.map(machine => 
      this.calculateCompatibilityScore(machine, fabric)
    ).filter(comp => comp.category !== 'avoid');

    if (compatibilities.length === 0) {
      return null;
    }

    // Sort by compatibility score
    compatibilities.sort((a, b) => b.score - a.score);

    // Get best machine
    const bestCompatibility = compatibilities[0];

    // Find best worker for this machine
    const workerScores = workers.map(worker => {
      const impact = this.calculateWorkerImpact(worker, bestCompatibility.machine, fabric);
      const totalScore = worker.skillLevel + 
        (worker.knotSpecialization.includes(bestCompatibility.machine.type) ? 20 : 0) +
        (worker.preferredMachineTypes.includes(bestCompatibility.machine.type) ? 10 : 0) +
        (impact.efficiencyBonus * 50);
      
      return { worker, score: totalScore, impact };
    });

    workerScores.sort((a, b) => b.score - a.score);
    const bestWorker = workerScores[0];

    // Apply factory constraints
    const factoryConstraints = this.applyFactoryConstraints(bestCompatibility, bestWorker.impact);

    // Calculate final suitability score
    const suitabilityScore = Math.round(
      (bestCompatibility.score * 0.6 + 
       bestWorker.score * 0.3 + 
       (100 - factoryConstraints.feasibilityScore) * 0.1)
    );

    // Generate explanation
    const explanation = this.generateExplanation(
      bestCompatibility, 
      bestWorker.worker, 
      fabric, 
      bestWorker.impact,
      factoryConstraints
    );

    return {
      machine: bestCompatibility.machine,
      worker: bestWorker.worker,
      suitabilityScore,
      explanation,
      compatibility: bestCompatibility,
      factoryConstraints
    };
  }
}

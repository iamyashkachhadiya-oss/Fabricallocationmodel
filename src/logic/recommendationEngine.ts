import { Fabric, Machine, Worker, Recommendation } from '../types';

export class RecommendationEngine {
  private getSpeedValue(speed: 'low' | 'medium' | 'high'): number {
    switch (speed) {
      case 'low': return 1;
      case 'medium': return 2;
      case 'high': return 3;
    }
  }

  private getStrengthValue(strength: 'thin' | 'medium' | 'thick'): number {
    switch (strength) {
      case 'thin': return 1;
      case 'medium': return 2;
      case 'thick': return 3;
    }
  }

  private getQualityValue(quality: 'low' | 'balanced' | 'premium'): number {
    switch (quality) {
      case 'low': return 1;
      case 'balanced': return 2;
      case 'premium': return 3;
    }
  }

  private isMachineCompatible(machine: Machine, fabric: Fabric): boolean {
    // Check if machine can handle the fabric material
    if (!machine.suitableFabrics.includes(fabric.material)) {
      return false;
    }

    // Check yarn strength compatibility
    const avgYarnCount = (fabric.warpYarnCount + fabric.weftYarnCount) / 2;
    const machineStrength = this.getStrengthValue(machine.strengthHandling);
    
    if (avgYarnCount > 40 && machineStrength < 2) return false; // Fine yarn needs medium+ strength
    if (avgYarnCount < 20 && machineStrength > 2) return false; // Thick yarn needs medium- strength

    return true;
  }

  private calculateMachineScore(machine: Machine, fabric: Fabric): number {
    let score = 0;

    // Material compatibility bonus
    if (machine.suitableFabrics.includes(fabric.material)) {
      score += 30;
    }

    // Speed vs quality balance
    const qualityValue = this.getQualityValue(fabric.qualityPriority);
    const speedValue = this.getSpeedValue(machine.maxSpeed);
    
    if (qualityValue === 3 && speedValue <= 2) score += 20; // Premium quality prefers lower speed
    if (qualityValue === 1 && speedValue >= 2) score += 20; // Low quality can handle higher speed
    if (qualityValue === 2 && speedValue === 2) score += 15; // Balanced prefers medium speed

    // GSM and strength handling
    if (fabric.gsm > 200 && machine.strengthHandling === 'thick') score += 15;
    if (fabric.gsm < 150 && machine.strengthHandling === 'thin') score += 15;
    if (fabric.gsm >= 150 && fabric.gsm <= 200 && machine.strengthHandling === 'medium') score += 15;

    // Power efficiency consideration
    if (fabric.qualityPriority === 'low' && machine.powerUsage === 'low') score += 10;
    if (fabric.qualityPriority === 'premium' && machine.powerUsage === 'high') score += 10;

    return score;
  }

  private calculateWorkerScore(worker: Worker, machine: Machine, fabric: Fabric): number {
    let score = 0;

    // Skill level contribution
    score += worker.skillLevel * 5;

    // Machine specialization bonus
    if (worker.knotSpecialization.includes(machine.type)) {
      score += 20;
    }

    // Preferred machine type bonus
    if (worker.preferredMachineTypes.includes(machine.type)) {
      score += 15;
    }

    // Quality requirements
    if (fabric.qualityPriority === 'premium' && worker.skillLevel >= 8) score += 10;
    if (fabric.qualityPriority === 'low' && worker.skillLevel >= 5) score += 10;

    return score;
  }

  private generateExplanation(machine: Machine, worker: Worker, fabric: Fabric, machineScore: number, workerScore: number): string {
    const reasons: string[] = [];

    // Machine selection reasons
    if (!machine.suitableFabrics.includes(fabric.material)) {
      reasons.push(`${machine.name} was selected for material compatibility with ${fabric.material}`);
    }

    const avgYarnCount = (fabric.warpYarnCount + fabric.weftYarnCount) / 2;
    if (avgYarnCount > 40 && machine.type === 'airjet') {
      reasons.push(`Airjet machines were avoided due to high breakage risk with fine yarn (${avgYarnCount} count)`);
    }
    if (avgYarnCount > 40 && machine.type === 'rapier') {
      reasons.push(`Rapier loom handles fine yarn (${avgYarnCount} count) with lower breakage risk`);
    }

    if (fabric.gsm > 200 && machine.strengthHandling === 'thick') {
      reasons.push(`Heavy fabric (${fabric.gsm} GSM) requires ${machine.strengthHandling} yarn handling capability`);
    }

    if (fabric.qualityPriority === 'premium' && machine.maxSpeed !== 'high') {
      reasons.push(`Premium quality requires controlled speed (${machine.maxSpeed}) for better fabric consistency`);
    }

    // Worker selection reasons
    if (worker.knotSpecialization.includes(machine.type)) {
      reasons.push(`${worker.name} specializes in ${machine.type} knotting, reducing stoppage risk`);
    }

    if (worker.skillLevel >= 8 && fabric.qualityPriority === 'premium') {
      reasons.push(`High skill level (${worker.skillLevel}/10) ensures premium quality standards`);
    }

    if (worker.preferredMachineTypes.includes(machine.type)) {
      reasons.push(`Worker preference for ${machine.type} machines improves productivity and quality`);
    }

    // Combine reasons
    if (reasons.length === 0) {
      return `${machine.name} with ${worker.name} provides the best balance of capabilities for this fabric type and quality requirements.`;
    }

    return reasons.join('. ') + '.';
  }

  public getRecommendation(fabric: Fabric, machines: Machine[], workers: Worker[]): Recommendation | null {
    // Filter compatible machines
    const compatibleMachines = machines.filter(machine => this.isMachineCompatible(machine, fabric));
    
    if (compatibleMachines.length === 0) {
      return null;
    }

    // Calculate scores for all machine-worker combinations
    const combinations: Array<{
      machine: Machine;
      worker: Worker;
      totalScore: number;
      machineScore: number;
      workerScore: number;
    }> = [];

    for (const machine of compatibleMachines) {
      const machineScore = this.calculateMachineScore(machine, fabric);
      
      for (const worker of workers) {
        const workerScore = this.calculateWorkerScore(worker, machine, fabric);
        combinations.push({
          machine,
          worker,
          totalScore: machineScore + workerScore,
          machineScore,
          workerScore
        });
      }
    }

    // Sort by total score (highest first)
    combinations.sort((a, b) => b.totalScore - a.totalScore);

    if (combinations.length === 0) {
      return null;
    }

    // Return the best combination
    const best = combinations[0];
    const suitabilityScore = Math.min(100, Math.round((best.totalScore / 120) * 100)); // Normalize to 0-100

    return {
      machine: best.machine,
      worker: best.worker,
      suitabilityScore,
      explanation: this.generateExplanation(best.machine, best.worker, fabric, best.machineScore, best.workerScore),
      compatibility: {
        machine: best.machine,
        score: best.machineScore,
        category: 'acceptable',
        reasons: [],
        speedReduction: 0,
        qualityRisk: 0,
        costPenalty: 0
      },
      factoryConstraints: {
        speedReduction: 0,
        qualityRisk: 0,
        costPenalty: 0,
        feasibilityScore: suitabilityScore
      }
    };
  }
}

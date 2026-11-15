const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
};

const COMPUTE = new Set(['minecraft', 'vps', 'vds', 'vm', 'dedicated', 'docker', 'kubernetes', 'bot', 'agents', 'model', 'os', 'web', 'wordpress']);

export function planSpecs(plan, categoryId) {
  if (!plan) return null;

  const forcedCpu = num(plan.cpu);
  const forcedRam = num(plan.ram);
  const forcedStorage = num(plan.storage);
  if (forcedCpu || forcedRam || forcedStorage) {
    return { cpu: forcedCpu, ram: forcedRam, storage: forcedStorage };
  }

  const spec = String(plan.spec || '');
  if (!spec) return null;

  const ramM = spec.match(/([\d.]+)\s*GB\s*RAM/i);
  const cpuM = spec.match(/([\d.]+)\s*(vCPU|CPU|Core)/i);
  const rest = spec.replace(/[\d.]+\s*GB\s*RAM/i, ' ');
  const storeM = rest.match(/([\d.]+)\s*(GB|TB)/i);

  const ram = ramM ? num(ramM[1]) : null;
  const cpu = cpuM ? Math.round(num(cpuM[1]) * 100) : null;
  const storage = storeM ? (/TB/i.test(storeM[2]) ? Math.round(num(storeM[1]) * 1024) : num(storeM[1])) : null;

  if (!ram && !cpu) {
    if (!categoryId || !COMPUTE.has(categoryId)) return null;
    const price = Number(plan.price) || 0;
    const derivedRam = Math.max(1, Math.round(price / 40));
    return { cpu: Math.max(100, derivedRam * 50), ram: derivedRam, storage: Math.max(10, derivedRam * 10) };
  }

  return { cpu, ram, storage };
}

export function specChips(plan, categoryId) {
  const chips = Array.isArray(plan?.features) ? [...plan.features] : [];
  const s = planSpecs(plan, categoryId);
  if (!s) return chips;
  if (s.cpu) chips.push(`${s.cpu}% CPU`);
  if (s.ram) chips.push(`${s.ram} GB RAM`);
  if (s.storage) chips.push(`${s.storage} GB NVMe`);
  return chips;
}

import type { FamilyLedger, DecisionOption, LedgerRequirement } from '../constants/ledgerTypes';

function getNestedValue(ledger: FamilyLedger, path: string): number | boolean | undefined {
  const parts = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = ledger;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

function meetsRequirement(ledger: FamilyLedger, key: string, requirement: { min?: number; max?: number } | boolean): boolean {
  const value = getNestedValue(ledger, key);

  if (typeof requirement === 'boolean') {
    return value === requirement;
  }

  if (typeof value !== 'number') return true;

  if (requirement.min !== undefined && value < requirement.min) return false;
  if (requirement.max !== undefined && value > requirement.max) return false;

  return true;
}

function meetsAllRequirements(ledger: FamilyLedger, requires: LedgerRequirement): boolean {
  for (const [key, requirement] of Object.entries(requires)) {
    if (!meetsRequirement(ledger, key, requirement)) return false;
  }
  return true;
}

export function filterOptions(options: DecisionOption[], ledger: FamilyLedger): DecisionOption[] {
  const available = options.filter((opt) => {
    if (!opt.requires) return true;
    return meetsAllRequirements(ledger, opt.requires);
  });

  // Always show at least 2 options
  if (available.length >= 2) return available;

  // Add options back until we have 2
  const unavailable = options.filter((opt) => !available.includes(opt));
  const toAdd = unavailable.slice(0, 2 - available.length);
  return [...available, ...toAdd];
}

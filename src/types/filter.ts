export interface FilterParams {
    property?: string;
    utility?: string;
    amr?: string;
    billCycle?: string;
  
    buildingMeterCount?: { min: number | null; max: number | null };
    currentCount?: { min: number | null; max: number | null };
    nonCommCount?: { min: number | null; max: number | null};
    days4to10?: { min: number | null; max: number | null };
    days10to30?: { min: number | null; max: number | null };
    days30to60?: { min: number | null; max: number | null };
    days60to90?: { min: number | null; max: number | null };
    days90Plus?: { min: number | null; max: number | null };
  }
  
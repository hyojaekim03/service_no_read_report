export const parseRangeFilter = (range: string | undefined) => {
    if (!range || range === "All") return { min: null, max: null };
  
    if (range.includes("-")) {
      const [min, max] = range.split("-").map(Number);
      return { min, max };
    }
  
    if (range.startsWith("<")) {
      return { min: 0, max: Number(range.replace("<", "")) };
    }
  
    if (range.endsWith("+")) {
      return { min: Number(range.replace("+", "")), max: null };
    }
  
    return { min: null, max: null };
  };
  
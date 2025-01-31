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

  export const parseNonCommFilter = (range: string | undefined) => {
    const percentSign = "%"
    const numRange = range?.replace(percentSign, " ")

    if (!range || range === "All") return { min: 0, max: 100 };
  
    if (numRange!.includes("-")) {
      const [min, max] = numRange!.split("-").map(Number);
      return { min, max };
    }
  
    if (numRange!.startsWith("<")) {
      return { min: 0, max: Number(numRange!.replace("<", "")) };
    }
  
    return { min: 100, max: 100};
  
    // return { min: null, max: null };
  };
  
  
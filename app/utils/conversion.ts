export const categories: any = {
  Length: ["meter", "kilometer", "centimeter"],
  Mass: ["kilogram", "gram"],
  Temperature: ["C", "F"],
};
// == SHORT NAME SUPPORT ==
const unitMap: any = {
  km: "kilometer",
  m: "meter",
  cm: "centimeter",
  kg: "kilogram",
  g: "gram",
  c: "C",
  f: "F",
};

export const convert = (
  value: any,
  from: string,
  to: string,
  category: string
) => {
  value = parseFloat(value);


  from = unitMap[from.toLowerCase()] || from;
  to = unitMap[to.toLowerCase()] || to;

  // == TEMPERATURE ==
  if (category === "Temperature") {
    if (from === "C" && to === "F") return (value * 9) / 5 + 32;
    if (from === "F" && to === "C") return ((value - 32) * 5) / 9;
    return value;
  }

  // == LENGTH + MASS ==
  const map: any = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    kilogram: 1,
    gram: 0.001,
  };

  if (!map[from] || !map[to]) {
    throw new Error("Invalid units");
  }

  const base = value * map[from]; 
  return base / map[to];
};
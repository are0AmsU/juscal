export const getMaxIdFromMap = (map: Map<number, any>): number | null => {
  const id = Math.max(...Array.from(map.keys()));
  return id < 0 ? null : id;
};

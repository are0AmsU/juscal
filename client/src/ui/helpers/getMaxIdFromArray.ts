export const getMaxIdFromArray = (
  array: { id: number; [key: string]: any }[]
): number | null => {
  const id = Math.max(...array.map((item) => item.id));
  return id < 0 ? null : id;
};

import { $host } from ".";

export const createNadeTarget = async (nadeId: number, targetId: number) => {
  const { data } = await $host.post(`api/nade-target`, { nadeId, targetId });
  return data;
};

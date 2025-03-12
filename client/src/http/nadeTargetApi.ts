import { $host } from ".";

export const createNadeTarget = async (nadeId: number, targetId: number) => {
  const { data } = await $host.post(`api/nade-target`, { nadeId, targetId });
  return data;
};

export const deleteNadeTarget = async (nadeId: number, targetId: number) => {
  const { data } = await $host.delete(
    `api/nade-target?nadeId=${nadeId}&targetId=${targetId}`
  );
  return data;
};

import { $host } from ".";
import { INade } from "../ui/types";

export const createNade = async (
  mapId: string,
  nade: INade
): Promise<INade> => {
  const { data } = await $host.post(`api/nade/${mapId}`, { nade });
  return data;
};

export const getNadeTypes = async () => {
  const data = await $host.get("api/nade/types");
  return data;
};

export const updateNadeById = async (nadeId: number, nadeData: FormData) => {
  const { data } = await $host.put(`api/nade/:id`);
  return data;
};
